import React from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Link as RouterLink } from "react-router-dom";

interface MainProps {}

const useStyles = makeStyles((theme) => {
  return {
    box: { display: "flex" },
    card: {
      width: 300,
      height: 300,
      margin: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  };
});

function Main(props: MainProps) {
  const classes = useStyles();

  const appinfos = [
    { name: "Counter", summary: "Simple Counter App" },
    { name: "Todo", summary: "Simple Todo App" },
    { name: "Auth", summary: "Simple Auth App" },
  ];

  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>
        Demo Web App
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Implemented by Various Modern Web Frameworks
      </Typography>
      <Box className={classes.box}>
        {appinfos.map((appinfo, index) => (
          <Card key={appinfo.name} elevation={3} className={classes.card}>
            <CardContent>
              <Typography variant="h4" align="center" gutterBottom>
                {appinfo.name}
              </Typography>
              <Typography variant="subtitle1" align="center" gutterBottom>
                {appinfo.summary}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="outlined"
                color="primary"
                component={RouterLink}
                to={("/" + appinfo.name).toLowerCase()}
              >
                VIEW
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
}

export default Main;
