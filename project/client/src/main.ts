import { createApp } from "vue";
import App from "./App.vue";
import AxiosAdapter from "./infra/http/AxiosAdapter";
import Router from "./infra/router/Router";

const httpClient = new AxiosAdapter();

const app = createApp(App);
app.use(Router.build());
app.provide("httpClient", httpClient);
app.mount("#app");
