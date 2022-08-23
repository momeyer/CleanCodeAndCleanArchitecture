import AxiosAdapter from "../http/AxiosAdapter";
import { updateShoppingCartState } from "./UpdateShoppingCartState";

export async function placeOrder(state: any): Promise<void> {
  const httpClient = new AxiosAdapter();

  const response = await httpClient.post("http://localhost:3000/order/place", {
    cpf: "111.444.777-35",
    shoppingCartId: state.shoppingCart.id,
    date: new Date(),
  });

  await updateShoppingCartState(state);
}
