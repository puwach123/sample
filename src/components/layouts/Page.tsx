import React from "react";

import Box from "@material-ui/core/Box";

interface PageProps {
  children?: React.ReactNode;
}

function Page(props: PageProps) {
  return (
    <Box style={{ width: "95vw", height: "95vh", margin: "2.5vh auto" }}>
      {props.children}
    </Box>
  );
}

export default Page;
