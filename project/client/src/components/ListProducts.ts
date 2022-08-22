import { inject } from "vue";
import HttpClient from "../infra/http/httpClient";

export async function listProducts() {
  const httpClient = inject("httpClient") as HttpClient;

  const response = await httpClient.get("http://localhost:3000/products");
  return response.data;
}
