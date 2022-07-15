import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import { isLoggedIn } from '@/auth/index'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    name: "home",
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/views/main_views/DashboardView.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      // {
      //   path: "/affiliates",
      //   name: "affiliates",
      //   component: () => import("@/views/main_views/AffiliatesView.vue"),
      //   meta: {
      //     requiresAuth: true,
      //   },
      // },
      // {
      //   path: "/affiliates/new",
      //   name: "affiliate-new",
      //   component: () =>
      //     import("@/views/affiliates_view/AffiliatesCreateView.vue"),
      //   meta: {
      //     requiresAuth: true,
      //   },
      // },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
    meta: {
      requiresAuth: false,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach(async (to, from, next) => {
//   if (to.name == "login" && isLoggedIn()) {
//     next({ path: "/" });
//   } else if (to.meta.requiresAuth && !isLoggedIn()) {
//     next({
//       path: "/login",
//       query: { redirect: to.fullPath },
//     });
//   } else {
//     next();
//   }
// });

export default router;
