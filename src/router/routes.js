const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/adminlogin", component: () => import("pages/adminlogin.vue") },
      { path: "/login", component: () => import("pages/Login.vue") },
      { path: "/join-us", component: () => import("pages/JoinUs.vue") },
      { path: "/packets", component: () => import("pages/PacketList.vue") },
      { path: "/stores", component: () => import("pages/StoreList.vue") },
      { path: "/contact", component: () => import("pages/Contact.vue") },
      { path: "/support", component: () => import("pages/Support.vue") },
      {
        path: "user", component: () => import("pages/user/index"),
        children: [
          {path: 'profile' , component: () => import('pages/user/profile')},
          {path: 'dashboard' , component: () => import('pages/user/dashboard')},
        ]
      },
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
      { path: "/admin/userpackets", component: () => import("pages/admin/userpackets.vue") },
      { path: "/admin/cashbacks", component: () => import("pages/admin/cashbacks.vue") },
      { path: "/admin/buys", component: () => import("pages/admin/buys.vue") },
      { path: "/admin/support", component: () => import("pages/admin/support.vue") },
      { path: "/admin/contact", component: () => import("pages/admin/contact.vue") },
      { path: "/admin/users", component: () => import("pages/admin/users.vue") },
      { path: "/admin/user/:id", component: () => import("pages/admin/user.vue") }
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
