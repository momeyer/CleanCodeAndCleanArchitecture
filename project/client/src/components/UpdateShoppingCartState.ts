import { inject } from "vue";
import HttpClient from "../infra/http/httpClient";

export async function updateShoppingCartState(state: any): Promise<void> {
  const httpClient = inject("httpClient") as HttpClient;

  const response = await httpClient.get("http://localhost:3000/shoppingCart/SC1");
  console.log("shopping cart: ", response.data);
  state.shoppingCart = response.data;
}
