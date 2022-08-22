import AxiosAdapter from "../infra/router/http/AxiosAdapter";

export async function updateShoppingCartState(state: any): Promise<void> {
  const httpClient = new AxiosAdapter();

  const response = await httpClient.get("http://localhost:3000/shoppingCart/SC1");
  console.log("shopping cart: ", response.data);
  state.shoppingCart = response.data;
}
