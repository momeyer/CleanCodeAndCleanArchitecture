<script setup lang="ts">
import axios from "axios";
import { reactive, ref } from "vue";

let state = reactive<any>({ items: [], quantity: 0 });

let addItemToShoppingCart = async function (item: any) {
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
        {{ item.description }} €{{ item.price }}.00
        <input
          ref="quantity"
          type="number"
          step="1"
          min="1"
          max=""
          name="quantity"
          value="1"
          title="Qty"
          class="input-text qty text"
          size="4"
          pattern=""
          inputmode=""
        /><button @click="addItemToShoppingCart(item, quantity)">Add</button>
      </div>
    </div>
  </div>
</template>

<style>
.main {
  display: flex;
  fex-direction: row;
}

.quantity .input-text.qty {
  width: 35px;
  height: 39px;
  padding: 0 5px;
  text-align: center;
  background-color: transparent;
  border: 1px solid #efefef;
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
