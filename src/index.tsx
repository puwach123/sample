import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";

import { Button, CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import blue from "@material-ui/core/colors/blue";

import {
  BrowserRouter as Router,
  Link as RouterLink,
  Switch,
  Route,
} from "react-router-dom";

import AuthApp from "./apps/auth/AuthApp";

const Page = lazy(() => import("./components/layouts/Page"));
const Main = lazy(() => import("./apps/Main"));
const Counter = lazy(() => import("./apps/counter/Counter"));
const TodoApp = lazy(() => import("./apps/todo/TodoApp"));

const theme = createMuiTheme({
  overrides: {},
  palette: {
    primary: blue,
    background: {
      default: "#fff",
    },
  },
});

const routes = [
  {
    path: "/",
    exact: true,
    main: () => (
      <Page>
        <Main />
      </Page>
    ),
  },
  {
    path: "/auth",
    exact: true,
    main: () => (
      <Page>
        <Button
          size="large"
          startIcon={<ArrowBackIcon />}
          component={RouterLink}
          to={"/"}
        >
          Back
        </Button>
        <AuthApp />
      </Page>
    ),
  },
  {
    path: "/counter",
    exact: false,
    main: () => (
      <Page>
        <Button
          size="large"
          startIcon={<ArrowBackIcon />}
          component={RouterLink}
          to={"/"}
        >
          Back
        </Button>
        <Counter />
      </Page>
    ),
  },
  {
    path: "/todo",
    exact: false,
    main: () => (
      <Page>
        <Button
          size="large"
          startIcon={<ArrowBackIcon />}
          component={RouterLink}
          to={"/"}
        >
          Back
        </Button>
        <TodoApp />
      </Page>
    ),
  },
];

const Index = () => (
  <Router>
    <Suspense fallback={<div></div>}>
      <Switch>
        {routes.map((route, index) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            children={route.main}
          />
        ))}
      </Switch>
    </Suspense>
  </Router>
);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthApp />
  </ThemeProvider>,
  document.getElementById("root")
);
