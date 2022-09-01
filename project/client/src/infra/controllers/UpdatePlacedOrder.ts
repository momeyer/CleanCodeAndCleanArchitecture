import AxiosAdapter from "../http/AxiosAdapter";

export async function updatePlacedOrderState(state: any): Promise<void> {
  const httpClient = new AxiosAdapter();
  console.log("HERE", state);
  const response = await httpClient.get(`http://localhost:3000/order/${state.placedOrderId}`);
  console.log("Placed Order: ", response.data);
  state.PlacedOrder = response.data;
}
