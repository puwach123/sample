import React from "react";

import Content from "../components/layouts/Content";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

type AppInfo = {
  name: string;
  summary: string;
};

interface MainProps {
  appinfos: AppInfo[];
}

const useStyles = makeStyles((theme) => {
  return {};
});

function Main({ appinfos }: MainProps) {
  const classes = useStyles();

  return (
    <Content>
      <Typography variant="h2" align="center" gutterBottom>
        Demo Web App
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Implemented by Various Modern Web Frameworks
      </Typography>
      <Box
        style={{
          display: "flex",
        }}
      >
        {appinfos.map((appinfo, index) => (
          <Card
            key={appinfo.name}
            elevation={3}
            style={{
              width: 300,
              height: 300,
              margin: "16px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardContent style={{}}>
              <Typography variant="h4" align="center" gutterBottom>
                {appinfo.name}
              </Typography>
              <Typography variant="subtitle1" align="center" gutterBottom>
                {appinfo.summary}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant="outlined" color="primary">
                VIEW
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Content>
  );
}

export default Main;