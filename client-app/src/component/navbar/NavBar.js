import { AppBar, Divider, Drawer, Toolbar, Typography } from "@mui/material";
import React from "react";

const drawerWidth = 50;
function NavBar() {
  return (
    <>
      <AppBar position="absolute"  sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` , backgroundColor: "#F8F8F8" }}>
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="#000"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Mon espace de travail
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        PaperProps={{
          sx: {
            backgroundColor: "#4d4d4d",
            width: 40,
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        ></Toolbar>
        <Divider />
      </Drawer>
    </>
  );
}

export default NavBar;
