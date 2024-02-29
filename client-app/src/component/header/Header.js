import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import React,{useState} from "react";
import Search from "../search/Search";
import { Typography } from "@mui/material";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
//import SearchBar from "../../components/collections/SearchBar"

function Header({value, onChange }) {

  return (
    <>
    
      <Toolbar
        component="nav"
        variant="dense"
        sx={{marginTop:10, justifyContent: "space-between" }}
      >
       
       
         <Search value={value} onChange={onChange} />
         
        
        <IconButton href="/createTache">
          <LibraryAddIcon />
          </IconButton>
      </Toolbar>
  
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
