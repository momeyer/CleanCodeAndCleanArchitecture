<script setup lang="ts">
import axios from "axios";
import { reactive, onMounted } from "vue";
import { addItemToShoppingCart } from "../infra/controllers/AddItemToShoppingCart";
import { listProducts } from "../infra/controllers/ListProducts";
import ItemComponent from "../components/ItemComponent.vue";

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
        <ItemComponent :item="item"></ItemComponent>
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
</style>
