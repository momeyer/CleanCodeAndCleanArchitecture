import { createApp } from "vue";
import App from "./App.vue";
import Router from "./infra/router/Router";

const app = createApp(App);
app.use(Router.build());
app.mount("#app");
