import { inject } from "vue";
import HttpClient from "../infra/http/httpClient";
import { updateShoppingCartState } from "./UpdateShoppingCartState";

export async function removeItemFromShoppingCart(item: any, state: any): Promise<void> {
  const httpClient = inject("httpClient") as HttpClient;

  const response = await httpClient.post("http://localhost:3000/shoppingCart/SC1/remove", {
    productId: item.id,
  });

  await updateShoppingCartState(state);
}
