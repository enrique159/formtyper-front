import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/main_views/DashboardView.vue";
import AffiliatesView from "@/views/main_views/AffiliatesView.vue";
import AffiliatesCreateView from "@/views/affiliates_view/AffiliatesCreateView.vue";
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
        component: DashboardView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/affiliates",
        name: "affiliates",
        component: AffiliatesView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/affiliates/new",
        name: "affiliate-new",
        component: AffiliatesCreateView,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
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

router.beforeEach(async (to, from, next) => {
  if (to.name == "login" && isLoggedIn()) {
    next({ path: "/" });
  } else if (to.meta.requiresAuth && !isLoggedIn()) {
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
});

export default router;
