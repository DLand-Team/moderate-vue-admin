import { createRouter, createWebHistory } from "vue-router";
import { Home, Hello,Group } from "../pages";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "/parent_1/child_1",
          name: "child_1",
          component: Group,
        },
        {
          path: "/parent_1/child_2",
          name: "child_2",
          component: Hello,
        },
        {
          path: "/parent_1/child_3",
          name: "child_3",
          component: Hello,
        },
      ],
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
