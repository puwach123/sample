import React from "react";

import Box from "@material-ui/core/Box";

interface ContentProps {
  children?: React.ReactNode;
}

function Content(props: ContentProps) {
  return (
    <Box style={{ width: "95vw", height: "95vh", margin: "2.5vh auto" }}>
      {props.children}
    </Box>
  );
}

export default Content;
