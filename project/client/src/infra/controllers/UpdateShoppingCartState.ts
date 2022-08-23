import AxiosAdapter from "../http/AxiosAdapter";

export async function updateShoppingCartState(state: any): Promise<void> {
  const httpClient = new AxiosAdapter();
  const response = await httpClient.get(`http://localhost:3000/shoppingCart/${state.shoppingCart.id}`);
  console.log("shopping cart: ", response.data);
  state.shoppingCart = response.data;
}
