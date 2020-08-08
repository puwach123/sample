import React, { useState } from "react";

import {
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Button as Submit,
  CircularProgress,
  Backdrop,
  ListItemSecondaryAction,
  IconButton,
  Button,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

import { Provider, useSelector, useDispatch } from "react-redux";
import {
  createSlice,
  combineReducers,
  configureStore,
  PayloadAction,
} from "@reduxjs/toolkit";
import reduxLogger from "redux-logger";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

const useStyles = makeStyles((theme) => {
  return {
    notdone: { opacity: 0.5, marginLeft: theme.spacing(1) },
    completed: {
      backgroundColor: "rgba(0,255,0,0.15)",
      textDecoration: "line-through",
      marginBottom: 16,
      "&:hover": {
        textDecoration: "line-through",
        background: "rgba(0,255,0,0.35)",
      },
    },
    notcompleted: {
      backgroundColor: "rgba(0,0,0,0.05)",
      marginBottom: 16,
      "&:hover": {
        background: "rgba(0,0,0,0.15)",
      },
    },
  };
});

/* Data Model Begin */
interface Todo {
  id: number;
  item: string;
  status: "Done" | "NotDone";
}

const todos: Array<Todo> = [
  { id: 0, item: "Build Todo App", status: "NotDone" },
  { id: 1, item: "Build Login Form", status: "Done" },
  { id: 2, item: "Learn Next App", status: "NotDone" },
];
/* Data Model End */

/*  Redux Begin */

interface AddTodoPayload {
  id: number;
  item: string;
}

let nextTodoID = todos.length;
const todoSilce = createSlice({
  name: "todoapp",
  initialState: { todos: todos },
  reducers: {
    delAll: (state) => {
      state.todos = [];
    },
    delCompleted: (state) => {
      state.todos = state.todos.filter((todo) => todo.status !== "Done");
    },
    toggleStatus: (state, action: PayloadAction<number>) => {
      const found = state.todos.findIndex((todo) => todo.id === action.payload);
      const oriStatus = state.todos[found].status;
      state.todos[found].status = oriStatus === "NotDone" ? "Done" : "NotDone";
    },
    delByID: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    addTodo: {
      reducer: (state, action: PayloadAction<AddTodoPayload>) => {
        const { id, item } = action.payload;
        state.todos.push({ id: id, item: item, status: "NotDone" });
      },
      prepare: (item: string) => {
        return { payload: { id: nextTodoID++, item: item } };
      },
    },
  },
});

const {
  delAll,
  delCompleted,
  delByID,
  addTodo,
  toggleStatus,
} = todoSilce.actions;

const rootReducer = combineReducers({
  todoapp: todoSilce.reducer,
});
type RootState = ReturnType<typeof rootReducer>;

const rootStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger),
  devTools: process.env.NODE_ENV !== "production",
});
type RootDispatch = typeof rootStore.dispatch;

/* Redux End */

function TodoApp() {
  const classes = useStyles();
  const todos = useSelector((state: RootState) => state.todoapp.todos);
  const dispatch = useDispatch<RootDispatch>();

  const Row = (props: { children?: React.ReactNode }) => (
    <Grid container spacing={3} style={{ marginBottom: 16 }}>
      <Grid item xs={3}></Grid>
      <Grid item xs={6}>
        {props.children}
      </Grid>
    </Grid>
  );

  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>
        Todo App
      </Typography>
      <Row>
        <Typography variant="h3" display="inline" gutterBottom>
          Tasks
        </Typography>
        <Typography
          variant="h4"
          display="inline"
          gutterBottom
          className={classes.notdone}
        >
          ({todos.filter((todo) => todo.status === "NotDone").length})
        </Typography>
      </Row>
      <Row>
        <Formik
          initialValues={{
            item: "",
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              setSubmitting(false);
              dispatch(addTodo(values.item));
            }, 500);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={10}>
                  <Field
                    component={TextField}
                    name="item"
                    type="item"
                    variant="outlined"
                    fullWidth
                    size="small"
                    placeholder="Add Todo Item ..."
                  />
                </Grid>
                <Grid item xs>
                  <Submit
                    variant="contained"
                    color="primary"
                    aria-label="add-todo"
                    disabled={isSubmitting}
                    onClick={submitForm}
                    style={{ height: "100%", width: "100%" }}
                  >
                    ADD
                  </Submit>
                </Grid>
              </Grid>
              {isSubmitting && (
                <Backdrop open={isSubmitting}>
                  <CircularProgress color="inherit" />
                </Backdrop>
              )}
            </Form>
          )}
        </Formik>
      </Row>
      <Row>
        <Button
          variant="outlined"
          aria-label="delete-all"
          style={{ marginRight: 8 }}
          onClick={() => dispatch(delAll())}
        >
          CLEAR ALL
        </Button>
        <Button
          variant="outlined"
          aria-label="delete-completed"
          style={{ marginRight: 8 }}
          onClick={() => dispatch(delCompleted())}
        >
          CLEAR COMPLETED
        </Button>
      </Row>
      <Row>
        <List>
          {todos.map((todo, index) => (
            <ListItem
              button
              key={todo.id}
              className={
                todo.status === "Done"
                  ? classes.completed
                  : classes.notcompleted
              }
              onClick={() => dispatch(toggleStatus(todo.id))}
            >
              <ListItemText primary={todo.item} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => dispatch(delByID(todo.id))}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Row>
    </>
  );
}

export default () => (
  <Provider store={rootStore}>
    <TodoApp />
  </Provider>
);
