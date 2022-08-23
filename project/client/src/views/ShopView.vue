<script setup lang="ts">
import axios from "axios";
import { reactive, onMounted } from "vue";
import { addItemToShoppingCart } from "../infra/controllers/AddItemToShoppingCart";
import { listProducts } from "../infra/controllers/ListProducts";
import ItemComponent from "../components/ItemComponent.vue";

let state = reactive<any>({ items: [], shoppingCartId: "SC1" });

onMounted(async () => {
  const products = await listProducts();
  state.items = products;
});
</script>

<template>
  <div class="main">
    <div class="items">
      <button class="goToShoppingCart" @click="$router.push(`/ShoppingCart/${state.shoppingCartId}`)">🛒</button>
      <div><h3>Items</h3></div>
      <hr />
      <router-link :to="{ name: 'ShoppingCart', params: { shoppingCartId: state.shoppingCartId } }"
        >Navigate to Page2</router-link
      >
      <div class="item" v-for="item in state.items.list">
        <ItemComponent :item="item" :shoppingCartId="state.shoppingCartId"></ItemComponent>
      </div>
    </div>
  </div>
</template>

<style>
.main {
  display: flex;
  fex-direction: row;
}

.goToShoppingCart {
  margin: 2%;
  width: 10%;
  height: 10%;
  font-size: 20px;
}

.items {
  width: 50%;
  text-align: left;
  margin-left: 1%;
  margin-right: 1%;
}
</style>
