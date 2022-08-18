<script setup lang="ts">
import axios from "axios";
import { reactive, ref } from "vue";

let state = reactive<any>({ items: [], shoppingCart: { items: [] } });
let total = ref(0);
let addItem = function (item: any) {
  const existingItem = state.shoppingCart.items.find((shoopingCartItem) => shoopingCartItem.item === item.description);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.shoppingCart.items.push({ item: item.description, price: item.price, quantity: 1 });
  }
  total.value += item.price;
};

axios({ method: "get", url: "http://localhost:3000/products" }).then(function (response) {
  state.items = response.data;
});
</script>
<template>
  <div class="main">
    <div class="items">
      <h3>Items</h3>
      <hr />
      <div v-for="item in state.items.list">
        {{ item.description }} €{{ item.price }}.00 <button @click="addItem(item)">Add</button>
      </div>
    </div>
    <div class="shoppingCart">
      <h3>Shopping Cart - Total: €{{ total }}.00</h3>
      <hr />
      <div v-for="item in state.shoppingCart.items">
        {{ item.item }} €{{ item.price }}.00 .................... quantity: {{ item.quantity }}
      </div>
    </div>
  </div>
</template>

<style>
.main {
  display: flex;
  fex-direction: row;
}

.items {
  width: 50%;
  text-align: left;
  margin-left: 1%;
  margin-right: 1%;
}

.shoppingCart {
  margin-left: 1%;
  margin-right: 1%;
  width: 50%;
}
</style>
