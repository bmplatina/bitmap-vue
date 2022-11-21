import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

const routes = [
  {
    path: "/games",
    name: "games",
    component: () => import("../components/Games.vue"),
  },
  {
    path: "/pf",
    name: "projectFiles",
    component: () => import("../components/ProjectFiles.vue"),
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
