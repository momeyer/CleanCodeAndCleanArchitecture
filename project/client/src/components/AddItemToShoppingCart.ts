import axios from "axios";

export async function addItemToShoppingCart(item: any): Promise<void> {
  await axios({
    method: "post",
    url: "http://localhost:3000/ShoppingCart/SC1/",
    data: {
      productId: item.id,
      quantity: 1,
    },
  });
}
