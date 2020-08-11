import React, { Suspense } from "react";

import { Provider, useSelector } from "react-redux";
import rootStore from "./redux/store";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
  Redirect,
} from "react-router-dom";

import { RootState } from "./redux/store";

const Home = React.lazy(() => import("./components/pages/Home"));
const Login = React.lazy(() => import("./components/pages/Login"));
const Register = React.lazy(() => import("./components/pages/Register"));

const routes = [
  {
    path: "/",
    exact: true,
    private: true,
    main: <Home />,
  },
  {
    path: "/login",
    exact: false,
    private: false,
    main: <Login />,
  },
  {
    path: "/register",
    exact: false,
    private: false,
    main: <Register />,
  },
];

function PrivateRoute({ children, ...rest }: RouteProps) {
  const auth = useSelector((state: RootState) => state.auth);
  return (
    <Route
      {...rest}
      render={({ location }: RouteProps) =>
        auth.authed ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}

function AuthApp() {
  return (
    <Provider store={rootStore}>
      <Suspense fallback={<div></div>}>
        <Router>
          <Switch>
            {routes.map((route, index) =>
              route.private ? (
                <PrivateRoute
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  children={route.main}
                />
              ) : (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  children={route.main}
                />
              )
            )}
          </Switch>
        </Router>
      </Suspense>
    </Provider>
  );
}

export default AuthApp;
