import AxiosAdapter from "../infra/router/http/AxiosAdapter";

export async function addItemToShoppingCart(item: any): Promise<void> {
  const httpClient = new AxiosAdapter();
  await httpClient.post("http://localhost:3000/ShoppingCart/SC1/", {
    productId: item.id,
    quantity: 1,
  });
}
