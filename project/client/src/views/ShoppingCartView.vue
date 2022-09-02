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

let state = reactive<any>({ shoppingCart: {}, placedOrderId: "", isPlaced: false });
state.shoppingCart.id = route.params.shoppingCartId;

onMounted(async () => {
  updateShoppingCartState(state);
});
</script>
<template>
  <div class="shoppingCart">
    <div v-show="!state.isPlaced">
      <h3>
        Shopping Cart [{{ state.shoppingCart.id }}] - {{ state.isPlaced }} {{ state.placedOrderId }}
        <span class="shoppingCartTotal">Total: €{{ state.shoppingCart.total }}</span>
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
        <button class="backToShopView" @click="$router.push('/')">Back to shop</button>
      </div>
    </div>
    <div v-show="state.isPlaced === true">
      <button
        class="viewOrder"
        @click="this.$router.push({ name: 'PlacedOrder', params: { orderId: state.placedOrderId } })"
      >
        View Order {{ state.placedOrderId }}
      </button>
    </div>
  </div>
</template>

<style>
.main {
  display: flex;
  fex-direction: row;
  width: 50%;
  height: ;
}

.shoppingCart {
  padding: 4%;
  width: 100%;
  height: 100%;
  background-color: rgb(120, 170, 170);
}

.placeOrderButton {
  margin-top: 15%;
  padding: 2%;
  width: 49%;
}

.clearShoppingCart {
  margin-top: 2%;
  margin-left: 2%;
  padding: 2%;
  width: 49%;
}

.backToShopView {
  margin-top: 1%;
  padding: 2%;
  width: 100%;
}
.viewOrder {
  margin-top: 1%;
  padding: 2%;
  width: 100%;
}

.shoppingCartItems {
  height: 15%;
  width: 100%;
}
</style>
