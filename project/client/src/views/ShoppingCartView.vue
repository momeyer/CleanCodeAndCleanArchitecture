<script setup lang="ts">
import axios from "axios";
import { reactive, ref } from "vue";

let state = reactive<any>({ shoppingCart: {} });

let placeOrder = async function (item: any) {
  const response = await axios({
    method: "post",
    url: "http://localhost:3000/order/place",
    data: {
      cpf: "111.444.777-35",
      shoppingCartId: state.shoppingCart.id,
      date: new Date(),
    },
  });

  console.log(response);
  console.log(state.shoppingCart);
  if (response.data.status == "INVALID") {
    console.log("INVALID");
  } else {
    console.log("PLACED");
  }
};

axios({ method: "get", url: "http://localhost:3000/shoppingCart/SC1" }).then(function (response) {
  console.log("shopping cart: ", response.data);
  state.shoppingCart = response.data;
});
</script>
<template>
  <div class="main">
    <div class="shoppingCart">
      <h3>Shopping Cart - Total: €{{ state.shoppingCart.total }}</h3>
      <hr />

      <div v-for="item in state.shoppingCart.items">
        {{ item.id }} €{{ item.price }}.00 .................... quantity: {{ item.quantity }}
      </div>
      <button @click="placeOrder(item, quantity)">Place Order</button>
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
</style>
