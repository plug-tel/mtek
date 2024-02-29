import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { MenuItem, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import Search from "../search/Search";
//import SearchBar from "../../components/collections/SearchBar"

function Header({ value, onChange, handleChangeSelect, select,date,handleChangeDate }) {
  return (
    <>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ marginTop: 10, justifyContent: "space-between" }}
      >
        <Search value={value} onChange={onChange} />

        <TextField
          select
          style={{ width: 200 }}
          id="statut"
          label="Statut"
          name="statut"
          value={select}
          onChange={handleChangeSelect}
        >
          <MenuItem value="">choisir statut</MenuItem>
          <MenuItem value={"To Do"}>To Do</MenuItem>
          <MenuItem value={"Done"}>Done</MenuItem>
          <MenuItem value={"Doing"}>Doing</MenuItem>
        </TextField>
        <TextField
          style={{ width: 200 }}
          name="date"
          id="date"
          type="datetime-local"
          required
          format="yyyy-MM-dd HH:mm"
          value={date}
          onChange={handleChangeDate}
        />
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
