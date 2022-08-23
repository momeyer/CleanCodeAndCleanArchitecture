<script setup lang="ts">
defineProps(["item"]);
defineEmits(["removeItemFromShoppingCart"]);
</script>
<template>
  <button class="removeItemFromShoppingCart" @click="$emit('removeItemFromShoppingCart', item)">🗑</button>
  {{ item.id }} €{{ item.price }}.00 .................... quantity: {{ item.quantity }}
</template>

<style>
.removeItemFromShoppingCart {
  margin: 2%;
  width: 10%;
  height: 80%;
  font-size: 20px;
}
</style>
