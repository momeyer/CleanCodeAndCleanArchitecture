import AxiosAdapter from "../infra/router/http/AxiosAdapter";
import { updateShoppingCartState } from "./UpdateShoppingCartState";

export async function removeItemFromShoppingCart(item: any, state: any): Promise<void> {
  const httpClient = new AxiosAdapter();

  const response = await httpClient.post("http://localhost:3000/shoppingCart/SC1/remove", {
    productId: item.id,
  });

  await updateShoppingCartState(state);
}
