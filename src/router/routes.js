const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/HomePage.vue"),
        meta: {
          authRequired: true,
        },
      },
      {
        path: "/expiringSoon",
        component: () => import("pages/ExpiringProducts.vue"),
        meta: {
          authRequired: true,
        },
      },
      {
        path: "/recipes",
        component: () => import("pages/RecipesPage.vue"),
        meta: {
          authRequired: true,
        },
      },
      {
        path: "/newProduct",
        component: () => import("pages/NewProduct.vue"),
        meta: {
          authRequired: true,
        },
      },
      {
        path: "/checklist",
        component: () => import("src/pages/ChecklistPage.vue"),
        meta: {
          authRequired: true,
        },
      },
    ],
  },
  {
    path: "/category",
    component: () => import("pages/CategoryPage.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/settings",
    component: () => import("src/pages/SettingsPage.vue"),
    meta: {
      authRequired: true,
    },
  },
  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      {
        path: "/login",
        component: () => import("pages/LoginPage.vue"),
        name: "Login",
      },
      {
        path: "/register",
        component: () => import("pages/NewAccount.vue"),
      },
      {
        path: "/recoverPass",
        component: () => import("pages/RecoverPage.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
