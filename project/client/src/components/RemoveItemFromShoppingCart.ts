import axios from "axios";
import { updateShoppingCartState } from "./UpdateShoppingCartState";

export async function removeItemFromShoppingCart(item: any, state: any): Promise<void> {
  const response = await axios({
    method: "post",
    url: "http://localhost:3000/shoppingCart/SC1/remove",
    data: {
      productId: item.id,
    },
  });

  updateShoppingCartState(state);
}
