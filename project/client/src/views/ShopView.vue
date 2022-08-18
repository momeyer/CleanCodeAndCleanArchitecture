<script setup lang="ts">
import axios from "axios";
import { reactive, ref } from "vue";

let state = reactive<any>({ items: [] });

let addItemToShoppingCart = async function (item: any) {
  console.log(item.id);
  await axios({
    method: "post",
    url: "http://localhost:3000/ShoppingCart/SC1/",
    data: {
      productId: item.id,
      quantity: 1,
    },
  });
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
      <div class="item" v-for="item in state.items.list">
        {{ item.description }} €{{ item.price }}.00 <button @click="addItemToShoppingCart(item)">Add</button>
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
  text-align: left;
  margin-top: 2%;
  padding: 2%;
  padding: 2%;
}
</style>
