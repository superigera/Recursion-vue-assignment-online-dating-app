import { createRouter, createWebHistory } from "vue-router";

// ルートの定義
const routes = [
  {
    path: "/",
    component: () => import("@/pages/user-list.vue"),
  },
];

// Vue Router のインスタンスを作成
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
