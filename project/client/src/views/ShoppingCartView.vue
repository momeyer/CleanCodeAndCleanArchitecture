<script setup lang="ts">
import axios from "axios";
import { reactive, onMounted } from "vue";
import { removeItemFromShoppingCart } from "../components/RemoveItemFromShoppingCart";
import { placeOrder } from "../components/PlaceOrder";
import { updateShoppingCartState } from "../components/UpdateShoppingCartState";

let state = reactive<any>({ shoppingCart: {} });

onMounted(async () => {
  updateShoppingCartState(state);
});
</script>
<template>
  <div class="main">
    <div class="shoppingCart">
      <h3>Shopping Cart - Total: €{{ state.shoppingCart.total }}</h3>
      <hr />

      <div class="shoppingCartItem" v-for="item in state.shoppingCart.items">
        <button class="removeItemFromShoppingCart" @click="removeItemFromShoppingCart(item, state)">🗑</button>
        {{ item.id }} €{{ item.price }}.00 .................... quantity: {{ item.quantity }}
      </div>
      <div>
        <button class="placeOrderButton" @click="placeOrder(state)">Place Order</button>
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
  width: 100%;
}

.shoppingCartItem {
  height: 15%;
  width: 100%;
}

.removeItemFromShoppingCart {
  margin: 2%;
  width: 10%;
  height: 80%;
  font-size: 20px;
}
</style>
