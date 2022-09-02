<script setup lang="ts">
import axios from "axios";
import { reactive, onMounted } from "vue";
import { updatePlacedOrderState } from "../infra/controllers/UpdatePlacedOrder";
import { useRoute } from "vue-router";
const route = useRoute();

let state = reactive<any>({ PlacedOrder: {}, placedOrderId: "" });
state.placedOrderId = route.params.orderId;

onMounted(async () => {
  updatePlacedOrderState(state);
});
</script>
<template>
  <div class="OrderPlaced">
    <h3>Order: {{ state.PlacedOrder.id }}</h3>
    <h3>Status: {{ state.PlacedOrder.status }}</h3>
    <hr />
    <div>
      <button class="backToShopView" @click="$router.push('/')">Back to shop</button>
    </div>
  </div>
</template>
<style></style>
