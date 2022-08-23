import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import AxiosAdapter from "../src/infra/http/AxiosAdapter";
import ShoppingCartView from "../src/views/ShoppingCartView.vue";
import ShopView from "../src/views/ShopView.vue";

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, ms);
  });
}

test("Should create ShopView", async () => {
  const httpClient = new AxiosAdapter();
  const shopViewWrapper = mount(ShopView, {
    global: {
      provide: { httpClient },
    },
  });
  await sleep(200);
  await await shopViewWrapper.vm.$forceUpdate();
  expect(shopViewWrapper.get(".item").text()).toContain("Camera");

  // console.log(wrapper.html());
});

test("Should add item to Shopping Cart", async () => {
  const httpClient = new AxiosAdapter();
  const shopViewWrapper = mount(ShopView, {});

  const shoppingCartWrapper = mount(ShoppingCartView, {});

  await sleep(200);
  await await shopViewWrapper.vm.$forceUpdate();
  await shoppingCartWrapper.get(".clearShoppingCart").trigger("click");
  await await shoppingCartWrapper.vm.$forceUpdate();
  await shopViewWrapper.get(".addItemToShoppingCart").trigger("click");
  await shopViewWrapper.get(".addItemToShoppingCart").trigger("click");
  await await shoppingCartWrapper.vm.$forceUpdate();

  expect(shoppingCartWrapper.get(".shoppingCartTotal").text()).toBe("Total: €41");
});
