import { useEffect, useState } from "react";
import {
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Header from "component/header/Header";
import TacheList from "component/tache/TacheList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TacheService from "services/TacheService";

export default function Tache() {
  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [select, setSelect] = useState("");
  const [date, setDate] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    retrieveTaches();
  }, []);

  const retrieveTaches = () => {
    TacheService.getAll()
      .then(
        (response) => {
          console.log("data", response);
          setData(response.data);
          setIsloading(false);
        },
        (error) => {
          const _content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setData(_content);
        }
      )
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (Array.isArray(data)) {
      let filteredData = [...data];
      console.log("newlist", filteredData)
     if(searchInput) {
     filteredData =
      data &&
      data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
     }
     if(select) {
      filteredData =data &&
      data.filter((item) => {
        return Object.values(item)
          .includes(select);
      });
     }
     if(date) {
      let newDate=date.replace('T', ' ')
      console.log("newdate",newDate)
      filteredData =data &&
      data.filter((item) => {
        return Object.values(item)
          .includes(newDate);
      });
     }
    
     setFilteredResults(filteredData);
    }

  }, [data,searchInput,select,date]);
  

  return (
    <Container>
      <Header
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        handleChangeSelect={(e) => setSelect(e.target.value)} 
        select={select}
        date={date}
        handleChangeDate={(e)=>setDate(e.target.value)}
      />

      {isloading ? (
        <Stack justifyContent="center" alignItems="center">
          <CircularProgress size={50} />
        </Stack>
      ) : (
        <Container sx={{ py: 8 }} width="100%">
          {filteredResults.length === 0 ? (
            <Stack direction="row" justifyContent="center" alignItems="center">
              <Typography variant="h4">No Data!</Typography>
            </Stack>
          ) : (
            <DndProvider backend={HTML5Backend}>
              <Grid container spacing={4}>
                <TacheList filteredResults={filteredResults} />
              </Grid>
            </DndProvider>
          )}
        </Container>
      )}
    </Container>
  );
}
