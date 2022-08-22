import axios from "axios";

export function updateShoppingCartState(state: any): void {
  axios({ method: "get", url: "http://localhost:3000/shoppingCart/SC1" }).then(function (response) {
    console.log("shopping cart: ", response.data);
    state.shoppingCart = response.data;
  });
}
