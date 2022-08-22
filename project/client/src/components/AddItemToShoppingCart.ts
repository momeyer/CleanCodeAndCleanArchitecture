import { inject } from "vue";
import HttpClient from "../infra/http/httpClient";

export async function addItemToShoppingCart(item: any): Promise<void> {
  const httpClient = inject("httpClient") as HttpClient;

  await httpClient.post("http://localhost:3000/ShoppingCart/SC1/", {
    productId: item.id,
    quantity: 1,
  });
}
