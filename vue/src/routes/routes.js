import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import UserProfile from "@/pages/UserProfile.vue";
import Demo from "@/pages/Demo.vue";
import Login from "@/pages/Login.vue";
import { store } from '../store/store'

function guard(to, from, next) {
  if (store.getters.user) {
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
    redirect: "/demo",
    children: [
      {
        path: "user",
        name: "User Profile",
        beforeEnter: guard,
        component: UserProfile
      },
      {
        path: "demo",
        name: "Demo",
        beforeEnter: guard,
        component: Demo
      }
    ]
  }
];

export default routes;
