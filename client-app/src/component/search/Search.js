import React from"react";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, Paper } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Close } from "@mui/icons-material";

function Search({ value, onChange }) {
  return (
    <Paper
      component="form"
      sx={{
        p: "3px 4px",
        display: "flex",
        alignItems: "center",
        width: 300,
        height: 40,
      }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, width: 200 }}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        value={value}
        onChange={onChange}
      >
           <IconButton
     component="span" 
      type="button"
      sx={{ p: "10px" }}
      aria-label="close"
      //onClick={handleClose}
    >
      <Close />
    </IconButton>
    </InputBase>
    </Paper>
  );
}

export default Search;
