const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/adminlogin", component: () => import("pages/adminlogin.vue") },
      { path: "/login", component: () => import("pages/Login.vue") }
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    meta: { requiresAdmin: true },
    children: [
      { path: "/admin", component: () => import("pages/admin/stores.vue") },
      { path: "/admin/stores", component: () => import("pages/admin/stores.vue") },
      { path: "/admin/packets", component: () => import("pages/admin/packets.vue") },
      { path: "/admin/gutscheine", component: () => import("pages/admin/gutscheine.vue") },
      { path: "/admin/users", component: () => import("pages/admin/users.vue") }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;