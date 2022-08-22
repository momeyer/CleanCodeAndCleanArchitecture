<script setup lang="ts">
import axios from "axios";
import { reactive, onMounted } from "vue";
import { addItemToShoppingCart } from "../components/AddItemToShoppingCart";
import { listProducts } from "../components/ListProducts";

let state = reactive<any>({ items: [], quantity: 0 });

onMounted(async () => {
  const products = await listProducts();
  state.items = products;
});

</script>
<template>
  <div class="main">
    <div class="items">
      <h3>Items</h3>
      <hr />
      <div class="item" v-for="item in state.items.list">
        {{ item.description }} €{{ item.price }}.00
        <button class="addItemToShoppingCart" @click="addItemToShoppingCart(item)">Add</button>
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

.item {
  background-color: rgb(0, 170, 170);
  width: 50%;
  height: 15%;
  text-align: left;
  margin-top: 2%;
  padding: 1%;
  text-align: center;
}

.addItemToShoppingCart {
  width: 100%;
}
</style>
