import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import Login from "@/pages/Login.vue";

const axios = require('axios');

function guard(to, from, next) {
  if (localStorage.getItem('token')) {
    next();
  } else {
    next('/login'); // go to '/login';
  }
}

const routes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        beforeEnter: guard,
        component: Dashboard
      },
      {
        path: "user",
        name: "User Profile",
        beforeEnter: guard,
        component: UserProfile
      },
      {
        path: "table",
        name: "Table List",
        beforeEnter: guard,
        component: TableList
      },
      {
        path: "typography",
        name: "Typography",
        beforeEnter: guard,
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        beforeEnter: guard,
        component: Icons
      },
      {
        path: "maps",
        name: "Maps",
        beforeEnter: guard,
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        beforeEnter: guard,
        component: Notifications
      }
    ]
  }
];

export default routes;
