import AxiosAdapter from "../http/AxiosAdapter";
import { updateShoppingCartState } from "./UpdateShoppingCartState";

export async function removeItemFromShoppingCart(item: any, state: any): Promise<void> {
  const httpClient = new AxiosAdapter();

  const response = await httpClient.post(`http://localhost:3000/shoppingCart/${state.shoppingCart.id}/remove`, {
    productId: item.id,
  });

  await updateShoppingCartState(state);
}
