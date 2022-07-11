import { DiscountCode } from "../../src/domain/entity/DiscountCode";
import ShoppingCart from "../../src/domain/entity/ShoppingCart";
import { ShoppingCartIdGenerator } from "../../src/domain/entity/ShoppingCartIdGenerator";
import { NonPersistenDiscountCodeRepository } from "../../src/NonPersistentDiscountCodeRepository";
import { NonPersistentProductRepository } from "../../src/NonPersistentProductRepository";
import { NonPersistentShoppingCartRepository } from "../../src/NonPersistentShoppingCartRepository";
import { ShoppingCartUseCases } from "../../src/useCases/ShoppingCartUseCases";
import { camera, guitar, rubberDuck } from "../ProductSamples";

describe("ShoppingCart Use Cases", (): void => {
  let productRepository = new NonPersistentProductRepository();
  let discountCodeRepository = new NonPersistenDiscountCodeRepository();
  let shoppingCartRepository = new NonPersistentShoppingCartRepository();
  let shoppingCartIdGenerator = new ShoppingCartIdGenerator(0);
  let shoppingCartUseCases = new ShoppingCartUseCases(
    productRepository,
    discountCodeRepository,
    shoppingCartRepository,
    shoppingCartIdGenerator
  );
  let shoppingCart: ShoppingCart;

  beforeEach(async (): Promise<void> => {
    productRepository = new NonPersistentProductRepository();
    await productRepository.add(camera, 10);
    await productRepository.add(guitar, 10);
    await productRepository.add(rubberDuck, 10);
    discountCodeRepository = new NonPersistenDiscountCodeRepository();
    shoppingCartUseCases = new ShoppingCartUseCases(
      productRepository,
      discountCodeRepository,
      shoppingCartRepository,
      shoppingCartIdGenerator
    );
    shoppingCart = await shoppingCartUseCases.create();
  });

  test("Should get content from empty cart", async (): Promise<void> => {
    const output = await shoppingCartUseCases.getContent("SC1");

    expect(output.length).toBe(0);
  });

  test("Should get content from cart", async (): Promise<void> => {
    const added = await shoppingCartUseCases.addItem({ shoppingCartId: shoppingCart.id, productId: 1, quantity: 1 });
    expect(added).toBeTruthy();
    const output = await shoppingCartUseCases.getContent(shoppingCart.id);
    expect(output.length).toBe(1);
  });

  test("Should get content from cart with more than one item", async (): Promise<void> => {
    await shoppingCartUseCases.addItem({ shoppingCartId: shoppingCart.id, productId: 1, quantity: 1 });
    await shoppingCartUseCases.addItem({ shoppingCartId: shoppingCart.id, productId: 2, quantity: 3 });
    const output = await shoppingCartUseCases.getContent(shoppingCart.id);
    expect(output.length).toBe(2);
  });

  test("Should fail to add invalid item", async (): Promise<void> => {
    const added = await shoppingCartUseCases.addItem({ shoppingCartId: shoppingCart.id, productId: 400, quantity: 1 });
    expect(added).toBeFalsy();
    const output = await shoppingCartUseCases.getContent(shoppingCart.id);
    expect(output.length).toBe(0);
  });

  test("Should fail to add invalid quantity item", async (): Promise<void> => {
    expect(
      await shoppingCartUseCases.addItem({ shoppingCartId: shoppingCart.id, productId: 1, quantity: 0 })
    ).toBeFalsy();
    expect(
      await shoppingCartUseCases.addItem({ shoppingCartId: shoppingCart.id, productId: 1, quantity: -1 })
    ).toBeFalsy();
    const output = await shoppingCartUseCases.getContent(shoppingCart.id);
    expect(output.length).toBe(0);
  });

  test("Should fail to add more items than available in stock", async (): Promise<void> => {
    expect(
      await shoppingCartUseCases.addItem({ shoppingCartId: shoppingCart.id, productId: 1, quantity: 11 })
    ).toBeFalsy();
    const output = await shoppingCartUseCases.getContent(shoppingCart.id);
    expect(output.length).toBe(0);
  });

  test("Shouldn't fail to remove non-existenting item", async (): Promise<void> => {
    await shoppingCartUseCases.removeItem(shoppingCart.id, 400);
    const output = await shoppingCartUseCases.getContent(shoppingCart.id);
    expect(output.length).toBe(0);
  });

  test("Shouldn't fail to remove existenting item", async (): Promise<void> => {
    await shoppingCartUseCases.addItem({ shoppingCartId: shoppingCart.id, productId: 2, quantity: 3 });
    const removed = await shoppingCartUseCases.removeItem(shoppingCart.id, 2);
    expect(removed).toBeTruthy();
    const output = await shoppingCartUseCases.getContent(shoppingCart.id);
    expect(output.length).toBe(0);
  });

  test("Should clear shopping cart", async (): Promise<void> => {
    await shoppingCartUseCases.addItem({ shoppingCartId: shoppingCart.id, productId: 1, quantity: 3 });
    await shoppingCartUseCases.addItem({ shoppingCartId: shoppingCart.id, productId: 2, quantity: 3 });
    await shoppingCartUseCases.addItem({ shoppingCartId: shoppingCart.id, productId: 3, quantity: 3 });
    await shoppingCartUseCases.clear(shoppingCart.id);
    const output = await shoppingCartUseCases.getContent(shoppingCart.id);
    expect(output.length).toBe(0);
  });

  test("Should return 0 when product isn't in the cart", async (): Promise<void> => {
    const output = await shoppingCartUseCases.getItemQuantity(shoppingCart.id, 1);
    expect(output).toBe(0);
  });

  test("Should return item quantity", async (): Promise<void> => {
    await shoppingCartUseCases.addItem({ shoppingCartId: shoppingCart.id, productId: 1, quantity: 3 });
    const output = await shoppingCartUseCases.getItemQuantity(shoppingCart.id, 1);
    expect(output).toBe(3);
  });

  test("Should fail apply invalid discount code to shopping cart", async (): Promise<void> => {
    await shoppingCartUseCases.addItem({ shoppingCartId: shoppingCart.id, productId: 1, quantity: 3 });
    const output = await shoppingCartUseCases.applyDiscountCode(shoppingCart.id, "Vale100", new Date("2021-01-01"));
    expect(output).toBeFalsy();
  });

  test("Should fail apply expired discount code to shopping cart", async (): Promise<void> => {
    const discountCode: DiscountCode = {
      code: "Vale20",
      amount: 0.2,
      expireDate: new Date("2021-01-01"),
    };
    discountCodeRepository.add(discountCode);
    await shoppingCartUseCases.addItem({ shoppingCartId: shoppingCart.id, productId: 1, quantity: 3 });
    const output = await shoppingCartUseCases.applyDiscountCode(shoppingCart.id, "Vale20", new Date("2022-01-01"));
    expect(output).toBeFalsy();
  });

  test("Should apply discount code to shopping cart", async (): Promise<void> => {
    const discountCode: DiscountCode = {
      code: "Vale20",
      amount: 0.2,
      expireDate: new Date("2021-01-01"),
    };
    discountCodeRepository.add(discountCode);
    await shoppingCartUseCases.addItem({ shoppingCartId: shoppingCart.id, productId: 1, quantity: 3 });
    const output = await shoppingCartUseCases.applyDiscountCode(shoppingCart.id, "Vale20", new Date("2020-01-01"));
    expect(output).toBeTruthy();
  });

  test("Should generate order summary from shipping cart without discount", async (): Promise<void> => {
    await shoppingCartUseCases.addItem({ shoppingCartId: shoppingCart.id, productId: 1, quantity: 1 });
    await shoppingCartUseCases.addItem({ shoppingCartId: shoppingCart.id, productId: 2, quantity: 1 });
    const output = await shoppingCartUseCases.generateSummary(shoppingCart.id);
    expect(output.items.length).toBe(2);
    expect(output.subtotal).toBe(31.5);
    expect(output.shippingCost).toBe(40);
    expect(output.total).toBe(71.5);
  });

  test("Should generate order summary from shipping cart with discount", async (): Promise<void> => {
    const discountCode: DiscountCode = {
      code: "Vale20",
      amount: 0.2,
      expireDate: new Date("2021-01-01"),
    };
    discountCodeRepository.add(discountCode);
    await shoppingCartUseCases.addItem({ shoppingCartId: shoppingCart.id, productId: 1, quantity: 1 });
    await shoppingCartUseCases.addItem({ shoppingCartId: shoppingCart.id, productId: 2, quantity: 1 });
    const hasDiscount = await shoppingCartUseCases.applyDiscountCode(shoppingCart.id, "Vale20", new Date("2020-01-01"));
    expect(hasDiscount).toBeTruthy();
    const output = await shoppingCartUseCases.generateSummary(shoppingCart.id);
    expect(output.subtotal).toBe(25.2);
    expect(output.shippingCost).toBe(40);
    expect(output.total).toBe(65.2);
  });
});
