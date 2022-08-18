import { createRouter, createWebHistory } from "vue-router";
import ShoppingCartView from "../../views/ShoppingCartView.vue";
import ShopView from "../../views/ShopView.vue";

export default class Router {
  static build() {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/", component: ShopView },
        { path: "/shoppingCart/:shoppingCartId", component: ShoppingCartView },
      ],
    });
    return router;
  }
}
