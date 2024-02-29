import React from 'react'
import { Divider, InputBase, Paper } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
function Search({value,onChange}) {
  return (
    <Paper
    component="form"
    sx={{ p: '3px 4px',ml:2,display: 'flex', alignItems: 'center', width: 300,height:40 }}
  >
 <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>
    <InputBase
    sx={{ ml: 1, flex: 1 }}
      placeholder="Search"
      inputProps={{ 'aria-label': 'search' }}
      value={value}
      onChange={onChange}
    />
  </Paper>
  )
}

export default Search