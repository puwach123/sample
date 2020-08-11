import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { register } from "../../redux/actions/auth";
import { RootDispatch } from "../../redux/store";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { errSelector, statusSelector } from "../../redux/selectors/auth";

import { Link as RouterLink } from "react-router-dom";
import {
  Typography,
  Link,
  makeStyles,
  Container,
  Box,
  Button,
  Grid,
} from "@material-ui/core";
import { idle } from "../../redux/reducers/auth";

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
  success: {
    color: theme.palette.success.main,
    marginTop: theme.spacing(2),
  },
}));

interface Values {
  username: string;
  password: string;
  confirm: string;
}

function Register() {
  const classes = useStyles();

  const status = useSelector(statusSelector);
  const error = useSelector(errSelector);
  const dispatch = useDispatch<RootDispatch>();

  return (
    <>
      <Box style={{ height: "20vh" }} />
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Box className={classes.paper}>
          <Typography variant="h4" component="h3" gutterBottom>
            Register
          </Typography>
          <Formik
            initialValues={{
              username: "",
              password: "",
              confirm: "",
            }}
            validate={(values) => {
              const errors: Partial<Values> = {};
              if (!values.username) errors.username = "Required";
              if (!values.password) errors.password = "Required";
              if (!values.confirm) errors.confirm = "Required";
              if (values.password !== values.confirm) {
                errors.password = "Password Mismatch";
                errors.confirm = "Password Mismatch";
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              await dispatch(register({ ...values }));
              setSubmitting(false);
              resetForm();
            }}
            validateOnChange={false}
            validateOnBlur={false}
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
                <Field
                  component={TextField}
                  type="password"
                  margin="normal"
                  variant="outlined"
                  required
                  id="confirm"
                  label="confirm"
                  name="confirm"
                  autoComplete="confirm"
                  fullWidth
                />
                {status === "SUCCESS" && (
                  <Typography
                    className={classes.success}
                    align="center"
                    variant="body2"
                  >
                    Registration Succeeded. Please Switch to Login Page.
                  </Typography>
                )}
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
                  Register
                </Button>
              </Form>
            )}
          </Formik>
          <Grid container>
            <Grid item xs></Grid>
            <Grid>
              <Link
                component={RouterLink}
                to="/login"
                variant="body2"
                onClick={() => dispatch(idle())}
              >
                {"Already have an account? Log in"}
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

export default Register;
