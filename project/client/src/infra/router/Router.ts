import { createRouter, createWebHistory } from "vue-router";
import PlaceOrderView from "../../views/PlaceOrderView.vue";
import ShopView from "../../views/ShopView.vue";

export default class Router {
  static build() {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/", component: ShopView },
        { path: "/placeOrder", component: PlaceOrderView },
      ],
    });
    return router;
  }
}
