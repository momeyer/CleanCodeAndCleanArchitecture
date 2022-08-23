<script setup lang="ts">
import axios from "axios";
import { reactive, onMounted, methods } from "vue";
import { removeItemFromShoppingCart } from "../infra/controllers/RemoveItemFromShoppingCart";
import { placeOrder } from "../infra/controllers/PlaceOrder";
import { updateShoppingCartState } from "../infra/controllers/UpdateShoppingCartState";
import { clearShoppingCart } from "../infra/controllers/ClearShoppingCart";
import ShoppingCartItemComponent from "../components/ShoppingCartItemComponent.vue";
import { useRoute } from "vue-router";
const route = useRoute();

let state = reactive<any>({ shoppingCart: {} });
state.shoppingCart.id = route.params.shoppingCartId;

onMounted(async () => {
  updateShoppingCartState(state);
});
</script>
<template>
  <!-- {{ shoppingCartId }} -->
  <!-- {{ (state.shoppingCart.id = $route.params.shoppingCartId) }} -->
  <div class="main">
    <div class="shoppingCart">
      <h3>
        Shopping Cart - <span class="shoppingCartTotal">Total: €{{ state.shoppingCart.total }}</span>
      </h3>
      <hr />

      <div class="shoppingCartItems" v-for="item in state.shoppingCart.items">
        <ShoppingCartItemComponent
          :item="item"
          @removeItemFromShoppingCart="removeItemFromShoppingCart(item, state)"
        ></ShoppingCartItemComponent>
      </div>
      <div>
        <button class="placeOrderButton" @click="placeOrder(state)">Place Order</button>
        <button class="clearShoppingCart" @click="clearShoppingCart(state)">Clear Shopping Cart</button>
      </div>
      <div>
        <button class="backTpShopView" @click="$router.push('/')">Back to shop</button>
      </div>
    </div>
  </div>
</template>

<style>
.main {
  display: flex;
  fex-direction: row;
}

.shoppingCart {
  margin-left: 1%;
  margin-right: 1%;
  width: 50%;
}

.placeOrderButton {
  margin-top: 15%;
  padding: 2%;
  width: 49%;
}

.clearShoppingCart {
  margin-top: 15%;
  margin-left: 2%;
  padding: 2%;
  width: 49%;
}

.backTpShopView {
  margin-top: 1%;
  padding: 2%;
  width: 100%;
}

.shoppingCartItems {
  height: 15%;
  width: 100%;
}
</style>
