import { createApp } from "vue";
import App from "./App.vue";
import Router from "./infra/router/Router";

let router = Router.build();

const app = createApp(App);
app.use(router);
app.mount("#app");
