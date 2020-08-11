import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/actions/auth";
import { RootDispatch } from "../../redux/store";

import { Redirect, Link as RouterLink, useHistory } from "react-router-dom";
import {
  Typography,
  Link,
  makeStyles,
  Container,
  Box,
  Button,
  Grid,
} from "@material-ui/core";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { authedSelector, errSelector } from "../../redux/selectors/auth";
import { idle } from "../../redux/reducers/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    padding: theme.spacing(4),
    marginTop: theme.spacing(2),
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius * 2,
  },
  submit: {
    margin: theme.spacing(3, 0, 4),
  },
}));

interface Values {
  username: string;
  password: string;
}

function Login() {
  const classes = useStyles();
  const history = useHistory();

  const error = useSelector(errSelector);
  const dispatch = useDispatch<RootDispatch>();

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="/">
          Auth App
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <>
      <Box style={{ height: "20vh" }} />
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Box className={classes.paper}>
          <Typography variant="h4" component="h3" gutterBottom>
            Login
          </Typography>
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validate={(values) => {
              const errors: Partial<Values> = {};
              if (!values.username) errors.username = "Required";
              if (!values.password) errors.password = "Required";
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              await dispatch(login({ ...values }));
              setSubmitting(false);
              history.push("/", { from: "/login" });
            }}
          >
            {({ submitForm, isSubmitting, errors }) => (
              <Form>
                <Field
                  component={TextField}
                  margin="normal"
                  variant="outlined"
                  required
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="usernmae"
                  fullWidth
                />
                <Field
                  component={TextField}
                  type="password"
                  margin="normal"
                  variant="outlined"
                  required
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="password"
                  fullWidth
                />
                {error && (
                  <Typography color="error" variant="subtitle1">
                    {error}
                  </Typography>
                )}
                <Button
                  className={classes.submit}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  aria-label="login"
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Login
                </Button>
              </Form>
            )}
          </Formik>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid>
              <Link
                component={RouterLink}
                to="register"
                variant="body2"
                onClick={() => dispatch(idle())}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Box mt={4}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}

function WithRedirect() {
  const authed = useSelector(authedSelector);
  return authed ? (
    <Redirect to={{ pathname: "/", state: { from: "login" } }} />
  ) : (
    <Login />
  );
}

export default WithRedirect;
