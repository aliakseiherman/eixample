import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux'

// core components
import App from "layouts/App.jsx";
import RTL from "layouts/RTL.jsx";

import Login from "./views/Account/Login/Login.jsx";

import PrivateRoute from "./helpers/PrivateRoute";

import "assets/css/material-dashboard-react.css?v=1.6.0";

import http from './helpers/axios-helper';
import store from './store/store';

const hist = createBrowserHistory();

http.get('Session/GetCurrentLoginDetails')
  .then(function (response) {

    store.dispatch({ type: 'SET_TENANT', tenant: response.data.tenant });
    store.dispatch({ type: 'SET_USER', user: response.data.user })

    ReactDOM.render(
      <Provider store={store}>
        <Router history={hist}>
          <Switch>
            <Route path="/login" render={() => <Login />} />
            <PrivateRoute path="/app" component={App} />
            <PrivateRoute path="/rtl" component={RTL} />
            <Redirect from="/" to="/app/demo" />
          </Switch>
        </Router>
      </Provider>,
      document.getElementById("root")
    );
  });



