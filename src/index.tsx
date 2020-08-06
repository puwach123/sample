import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

import Main from "./apps/Main";
import Counter from "./apps/counter/Counter";

const theme = createMuiTheme({
  overrides: {},
  palette: {
    primary: blue,
    background: {
      default: "#FCFAF2",
    },
  },
});

const appinfos = [
  { name: "Counter", summary: "Simple Counter App" },
  { name: "Todo", summary: "Simple Todo App" },
];

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    {/* <Main appinfos={appinfos} /> */}
    <Counter />
  </ThemeProvider>,
  document.getElementById("root")
);
