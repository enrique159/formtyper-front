import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/main_views/DashboardView.vue";
import AffiliatesView from "@/views/affiliates_view/AffiliatesView.vue";
import AffiliatesCreateView from "@/views/affiliates_view/AffiliatesCreateView.vue";
import MembersView from "@/views/members_view/MembersView.vue";
import MembersCreateView from "@/views/members_view/MembersCreateView.vue";
import ReportsView from "@/views/reports_view/ReportsView.vue";
import UsersView from "@/views/users_view/UsersView.vue";
import UsersCreateView from "@/views/users_view/UsersCreateView.vue";
import StatsView from "@/views/stats_view/StatsView.vue";
import SettingsView from "@/views/settings_view/SettingsView.vue";
import SupportView from "@/views/support_view/SupportView.vue";
import NotAllowedView from "@/views/NotAllowedView.vue";
import { isLoggedIn } from '@/auth/index'
import store from '@/store'

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
      {
        path: "/members",
        name: "members",
        component: MembersView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/members/new",
        name: "member-new",
        component: MembersCreateView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/reports",
        name: "reports",
        component: ReportsView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/users",
        name: "users",
        component: UsersView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/users/new",
        name: "users-new",
        component: UsersCreateView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/stats",
        name: "stats",
        component: StatsView,
        meta: {
          requiresAuth: true,
          requiresAdmin: true,
        },
      },
      {
        path: "/settings",
        name: "settings",
        component: SettingsView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/support",
        name: "support",
        component: SupportView,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "/not-allowed",
        name: "not-allowed",
        component: NotAllowedView,
        meta: {
          requiresAuth: true,
        },
      }
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

const usertype = store.getters.getUser.usertype;
router.beforeEach(async (to, from, next) => {
  if (to.name == "login" && isLoggedIn()) {
    next({ path: "/" });
  } else if (to.meta.requiresAuth && !isLoggedIn()) {
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  } else {
    if(to.meta.requiresAdmin && usertype != "admin"){
      next({
        path: "/not-allowed",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  }
});

export default router;
