import React, { useState, useRef } from "react";

import Content from "../../components/layouts/Content";
import { Typography, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Provider, useSelector, useDispatch } from "react-redux";
import { createSlice, combineReducers, configureStore } from "@reduxjs/toolkit";
import reduxLogger from "redux-logger";

const useStyles = makeStyles((theme) => {
  return {
    button: {
      width: 200,
      height: 50,
    },
  };
});

interface CounterAction {
  type: string;
  payload: number;
}

const counterSlice = createSlice({
  name: "counter",
  initialState: 0 as number,
  reducers: {
    increment: (state, action: CounterAction) => state + action.payload,
    decrement: (state, action: CounterAction) => state - action.payload,
    reset: (state) => 0,
  },
});

const { increment, decrement, reset } = counterSlice.actions;

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
});
type RootState = ReturnType<typeof rootReducer>;

const rootStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger),
  devTools: process.env.NODE_ENV !== "production",
});
type RootDispatch = typeof rootStore.dispatch;

function Counter() {
  const classes = useStyles();
  const counter = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch<RootDispatch>();
  const tidref = useRef(0);

  const toggleTimer = () => {
    if (tidref.current !== 0) {
      window.clearInterval(tidref.current);
      return;
    }
    tidref.current = window.setInterval(() => {
      dispatch(increment(1));
    }, 1000);
  };

  return (
    <Content>
      <Typography variant="h2" align="center" gutterBottom>
        Conuter
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}></Grid>
        <Grid item xs={4}>
          <Typography variant="h2" align="left">
            Current Value:
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h2" align="left">
            {counter}
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={3}></Grid>
        <Grid item xs={4}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={() => dispatch(increment(1))}
          >
            ADD
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
            onClick={() => dispatch(decrement(1))}
          >
            MIUS
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={3}></Grid>
        <Grid item xs={4}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={() => dispatch(reset())}
          >
            RESET
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.button}
            onClick={() => toggleTimer()}
          >
            TOGGLE TIMER
          </Button>
        </Grid>
      </Grid>
    </Content>
  );
}

export default () => (
  <Provider store={rootStore}>
    <Counter />
  </Provider>
);
