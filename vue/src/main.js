// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";

// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

import { store } from './store/store'

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/index.css';

const axios = require('axios');
import http from "./helpers/axios-helper";

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

Vue.prototype.$Chartist = Chartist;
Vue.prototype.$http = axios.create();

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(VueToast);

http.get('Session/GetCurrentLoginDetails')
  .then(function (response) {

    store.commit("setUser", response.data.user);
    store.commit("setTenant", response.data.tenant);

    /* eslint-disable no-new */
    new Vue({
      el: "#app",
      store,
      render: h => h(App),
      router,
      data: {
        Chartist: Chartist
      }
    });
  });

