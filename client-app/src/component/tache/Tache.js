import { useEffect, useState } from "react";

import {
  CircularProgress,
  Container,
  Stack,
  Typography
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Header from "component/header/Header";
import TacheList from "component/tache/TacheList";

import { getAll, getAllTaches } from "actions/tache";
import TacheService from "services/TacheService";

export default function Tache() 
{
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const tutorials = useSelector(state => state.payload);
  console.log("taches store",tutorials)

  useEffect(() => {
    retrieveTaches();
  }, []);

  const retrieveTaches = () => {
    TacheService.getAll()
      .then(
        (response) => {
          console.log("data",response.data)
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
    }

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
        <Container>
          {filteredResults.length === 0 ? (
            <Stack direction="row" justifyContent="center"alignItems="center" >
            <Typography variant="h4">No Data!</Typography>
          </Stack>
          ) : (
            <TacheList filteredResults={filteredResults} />
          )}
        </Container>
      )}
    </Container>
  );
}
