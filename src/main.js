import { createApp } from "vue";
import App from "./App.vue";
import * as Sentry from "@sentry/vue";
import router from "./router";
import store from "./store";
console.debug("排查错误日志");
console.log("vue3 app running");
const app = createApp(App).use(store).use(router).mount("#app");
Sentry.init({
  app,
  dsn: "__PUBLIC_DSN__",
  integrations: [
    // Or omit `router` if you're not using vue-router
    Sentry.browserTracingIntegration({ router }),
  ],
});
