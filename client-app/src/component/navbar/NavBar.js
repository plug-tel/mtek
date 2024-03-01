import React, { useCallback } from "react";
import { AppBar, Avatar, Divider, Drawer, IconButton, ListItemIcon, MenuItem, Toolbar, Typography } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { changeBGColor } from "utils/functions";
import { useDispatch } from "react-redux";
import { logout } from "actions/auth";
import { useNavigate } from "react-router-dom";
const drawerWidth = 50;
function NavBar() {
  const { user: currentUser } = useSelector(state=>state.auth);
  const dispatch=useDispatch();
  const navigate = useNavigate();

  const logOut = useCallback(() => {
      dispatch(logout());
      navigate("/Login");
    
  }, [dispatch]);

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
          <IconButton
           
           title="Account settings"
           size="small"
           sx={{ ml: 2 }}
          
         >
           <Avatar sx={{ width: 32, height: 32, backgroundColor: changeBGColor(currentUser.username), }}>{currentUser.username.charAt(0)}</Avatar>
         </IconButton>
         <IconButton onClick={logOut}>
            <Logout fontSize="small" />
         </IconButton>
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
