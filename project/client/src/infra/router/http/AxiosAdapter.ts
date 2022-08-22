import axios from "axios";
import HttpClient from "./httpClient";

export default class AxiosAdapter implements HttpClient {
  async get(url: string): Promise<any> {
    const response = await axios({ method: "get", url: url });
    return response;
  }
  async post(url: string, data: any): Promise<any> {
    const response = await axios({ method: "post", url: url, data: data });
    return response;
  }
}
