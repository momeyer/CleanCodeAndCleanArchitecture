import { mount } from "@vue/test-utils";
import { test } from "vitest";
import AxiosAdapter from "../src/infra/http/AxiosAdapter";
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
  const wrapper = mount(ShopView, {
    global: {
      provide: { httpClient },
    },
  });
  await sleep(200);
  await await wrapper.vm.$forceUpdate();
  console.log(wrapper.html);
});
