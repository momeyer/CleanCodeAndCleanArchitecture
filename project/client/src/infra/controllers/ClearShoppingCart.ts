import AxiosAdapter from "../http/AxiosAdapter";
import { updateShoppingCartState } from "./UpdateShoppingCartState";

export async function clearShoppingCart(state: any): Promise<void> {
  const httpClient = new AxiosAdapter();

  const response = await httpClient.post(`http://localhost:3000/ShoppingCart/${state.shoppingCart.id}/clear`, {});

  await updateShoppingCartState(state);
}
