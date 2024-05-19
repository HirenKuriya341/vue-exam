import { createRouter, createWebHistory } from "vue-router";
import store from "./store.js";

import StepOne from "./components/StepOne.vue";
import StepTwo from "./components/StepTwo.vue";
import StepThree from "./components/StepThree.vue";
import NotFound from "./UI/NotFound.vue";

const routers = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/step-1" },
    { path: "/step-1", component: StepOne },
    { path: "/step-2", component: StepTwo, meta: { requireData: true } },
    {
      path: "/step-3/",
      component: StepThree,
      meta: { requireData: true },
    },
    { path: "/:404(.*)", component: NotFound },
  ],
});

routers.beforeEach(function (to, from, next) {
  if (to.meta.requireData) {
    if (to.path == "/step-2") {
      if (store.state.modal && store.state.modalColor) {
        next();
      } else {
        next({ path: "/step-1" });
      }
    }
    if (to.path == "/step-3") {
      if (
        typeof store.state.currConfigs.configID != "undefined" &&
        store.state.currConfigs.configID != 0
      ) {
        next();
      } else {
        next({ path: "/step-2" });
      }
    }
  } else {
    next();
  }
});

export default routers;