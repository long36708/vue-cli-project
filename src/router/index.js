import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import FinalizationRegistryView from "@/views/FinalizationRegistryView.vue";
import TestBlock from "@/views/TestBlock.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/finalRegistry",
    name: "FinalizationRegistryView",
    component: FinalizationRegistryView,
  },
  {
    path: "/test-block",
    name: "TestBlock",
    component: TestBlock,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
