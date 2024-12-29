import * as React from "react";
import { AppBar, Box, CssBaseline, Toolbar, Typography } from "@mui/material";

interface Props {
  window?: () => Window;
}

export default function DrawerAppBar(props: Props) {
  const { window } = props;

  return (
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline /> */}
      <AppBar component="nav">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Logo/Title - Always Visible */}
          <Typography
            variant="h6"
            component="div"
            sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
          >
            Global Niryat
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
