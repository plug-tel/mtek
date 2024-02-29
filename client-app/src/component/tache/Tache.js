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
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    retrieveTaches();
  }, []);

  const retrieveTaches = () => {
    TacheService.getAll()
      .then(
        (response) => {
          console.log("data", response.data);
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
      const filteredData =
        data &&
        data.filter((item) => {
          return Object.values(item)
            .join("")
            .toLowerCase()
            .includes(searchInput.toLowerCase());
        });
      console.log("filtreResults", filteredResults);
      setFilteredResults(filteredData);
    }
  }, [data, searchInput]);

  return (
    <Container>
      <Header
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
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
