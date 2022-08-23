import AxiosAdapter from "../http/AxiosAdapter";

export async function listProducts() {
  const httpClient = new AxiosAdapter();

  const response = await httpClient.get("http://localhost:3000/products");
  return response.data;
}
