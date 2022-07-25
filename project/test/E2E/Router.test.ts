import axios from "axios";

describe("API tests", () => {
  beforeEach(async () => {
    await axios({
      url: "http://localhost:3000/shoppingCart/SC1/clear",
      method: "post",
    });
  });
  test("Should list products", async function (): Promise<void> {
    const response = await axios({
      url: "http://localhost:3000/products",
      method: "get",
    });
    let test = { id: 1, description: "Camera", price: 10 };
  });

  test("Should get shopping cart by ID", async function (): Promise<void> {
    let response = await axios({
      url: "http://localhost:3000/ShoppingCart/SC1",
      method: "get",
    });
    expect(response.data).toStrictEqual({
      items: [],
      subtotal: 0,
      total: 0,
      shippingCost: 0,
    });
  });
  test("Should add product to shopping cart", async function (): Promise<void> {
    let response = await axios({
      url: "http://localhost:3000/ShoppingCart/SC1",
      method: "post",
      data: {
        productId: 1,
        quantity: 2,
      },
    });
    expect(response.data).toStrictEqual({
      items: [{ id: 1, price: 10, quantity: 2 }],
      subtotal: 21,
      total: 41,
      shippingCost: 20,
    });
    response = await axios({
      url: "http://localhost:3000/ShoppingCart/SC1",
      method: "post",
      data: {
        productId: 2,
        quantity: 4,
      },
    });
    expect(response.data).toStrictEqual({
      items: [
        {
          id: 1,
          price: 10,
          quantity: 2,
        },
        {
          id: 2,
          price: 20,
          quantity: 4,
        },
      ],
      subtotal: 105,
      total: 245,
      shippingCost: 140,
    });
  });

  test("Should clear products from shopping cart", async function (): Promise<void> {
    let response = await axios({
      url: "http://localhost:3000/ShoppingCart/SC1",
      method: "post",
      data: {
        productId: 1,
        quantity: 2,
      },
    });
    expect(response.data).toStrictEqual({
      items: [{ id: 1, price: 10, quantity: 2 }],
      subtotal: 21,
      total: 41,
      shippingCost: 20,
    });

    response = await axios({
      url: "http://localhost:3000/shoppingCart/SC1/clear",
      method: "post",
    });
    expect(response.data).toStrictEqual({
      items: [],
      subtotal: 0,
      total: 0,
      shippingCost: 0,
    });
  });
});
