import AxiosAdapter from "../http/AxiosAdapter";

export async function addItemToShoppingCart(item: any, shoppingCartId: string): Promise<void> {
  const httpClient = new AxiosAdapter();

  await httpClient.post(`http://localhost:3000/ShoppingCart/${shoppingCartId}/`, {
    productId: item.id,
    quantity: 1,
  });
}
