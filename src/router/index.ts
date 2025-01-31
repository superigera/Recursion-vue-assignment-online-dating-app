import { createRouter, createWebHistory } from "vue-router";

// ルートの定義
const routes = [
  {
    path: "/",
    component: () => import("@/pages/user-list.vue"),
  },
  {
    path: "/user/:id",
    component: () => import("@/pages/user-detail.vue"),
  },
  {
    path: "/user/:id/chat",
    component: () => import("@/pages/chat.vue"),
  },
];

// Vue Router のインスタンスを作成
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
