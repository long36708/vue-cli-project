import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

console.log("vue3 app running");
createApp(App).use(store).use(router).mount("#app");
