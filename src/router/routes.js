const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/HomePage.vue") },
      {
        path: "/expiringSoon",
        component: () => import("pages/ExpiringProducts.vue"),
      },
      {
        path: "/recipes",
        component: () => import("pages/RecipesPage.vue"),
      },
      {
        path: "/newProduct",
        component: () => import("pages/NewProduct.vue"),
      },
      {
        path: "/profile",
        component: () => import("pages/UserProfile.vue"),
      },
    ],
  },
  {
    path: "/category",
    component: () => import("pages/CategoryPage.vue"),
  },
  {
    path: "/auth",
    component: () => import("layouts/AuthLayout.vue"),
    children: [
      { path: "/login", component: () => import("pages/LoginPage.vue") },
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
