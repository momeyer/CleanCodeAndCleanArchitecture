<script setup lang="ts">
import { addItemToShoppingCart } from "../infra/controllers/AddItemToShoppingCart";

defineProps(["item"]);
</script>
<template>
  {{ item.description }} €{{ item.price }}.00
  <button class="addItemToShoppingCart" @click="addItemToShoppingCart(item)">Add</button>
</template>

<style>
.addItemToShoppingCart {
  width: 100%;
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
</style>
