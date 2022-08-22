import axios from "axios";
import { updateShoppingCartState } from "./UpdateShoppingCartState";

export async function placeOrder(state: any): Promise<void> {
  const response = await axios({
    method: "post",
    url: "http://localhost:3000/order/place",
    data: {
      cpf: "111.444.777-35",
      shoppingCartId: state.shoppingCart.id,
      date: new Date(),
    },
  });
  updateShoppingCartState(state);
}
