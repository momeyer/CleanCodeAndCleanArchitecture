<script setup lang="ts">
import axios from "axios";
import { reactive, onMounted } from "vue";
import { removeItemFromShoppingCart } from "../infra/controllers/RemoveItemFromShoppingCart";
import { placeOrder } from "../infra/controllers/PlaceOrder";
import { updateShoppingCartState } from "../infra/controllers/UpdateShoppingCartState";
import { clearShoppingCart } from "../infra/controllers/ClearShoppingCart";
import ShoppingCartItemComponent from "../components/ShoppingCartItemComponent.vue";
let state = reactive<any>({ shoppingCart: {} });

onMounted(async () => {
  updateShoppingCartState(state);
});
</script>
<template>
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
  width: 50%;
}

.clearShoppingCart {
  margin-top: 15%;
  padding: 2%;
  width: 50%;
}

.shoppingCartItems {
  height: 15%;
  width: 100%;
}
</style>
