import { createRouter, createWebHistory } from "vue-router";
import PlacedOrderView from "../../views/PlacedOrderView.vue";
import ShoppingCartView from "../../views/ShoppingCartView.vue";
import ShopView from "../../views/ShopView.vue";

export default class Router {
  static build() {
    const router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/", component: ShopView },
        { path: "/shoppingCart/:shoppingCartId", name: "ShoppingCart", component: ShoppingCartView },
        { path: "/order/:orderId", name: "PlacedOrder", component: PlacedOrderView },
      ],
    });
    return router;
  }
}
