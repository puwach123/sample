import React from "react";
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

import Page from "./components/layouts/Page";
import Counter from "./apps/counter/Counter";
import TodoApp from "./apps/todo/TodoApp";
import Main from "./apps/Main";

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

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
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
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);
