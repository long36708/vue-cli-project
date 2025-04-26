import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
console.debug("排查错误日志");
console.log("vue3 app running");
createApp(App).use(store).use(router).mount("#app");
