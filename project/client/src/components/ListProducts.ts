import axios from "axios";

export function listProducts(state: any) {
  axios({ method: "get", url: "http://localhost:3000/products" }).then(function (response) {
    state.items = response.data;
  });
}
