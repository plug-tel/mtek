import {
  Alert,
  Box,
  Breadcrumbs,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { updateTache } from "actions/tache";
import CustomButtonGroup from "component/button/CustomButton";
import NavBar from "component/navbar/NavBar";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import TacheService from "services/TacheService";

export default function UpdateTache() {
  const { id } = useParams();
  console.log("id", id);
  const dispatch = useDispatch();
  const form = useRef();
  const checkBtn = useRef();
  const navigate = useNavigate();

  const [date, setDate] = useState();
  const [statut, setStatut] = useState();
  const [currentTacheData, setCurrentTacheData] = useState({
    titre: "",
    description: "",
    statut: "",
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState();

  useEffect(() => {
    if (id) retrieveTache(id);
  }, [id]);

  const retrieveTache = () => {
    TacheService.getTacheById(id)
      .then((response) => {
        setCurrentTacheData(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTacheData({
      ...currentTacheData,
      [name]: value,
    });
  };
  const handleChange = (event) => {
    setStatut(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      var data = {
        titre: currentTacheData.titre,
        description: currentTacheData.description,
        statut: statut,
        date: date,
      };
      dispatch(updateTache(id, data))
        .then(() => {
          setMessageSuccess("Tache modifié avec succée!");
          setTimeout(() => navigate("/"), 1000);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };
  const handelCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <NavBar />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Breadcrumbs subTitle={"Update tache"} />
          <Container sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <Box noValidate sx={{ mt: 1 }}>
                    <Form onSubmit={handleSubmit} ref={form}>
                      <Grid container item sm={10} md={10} lg={10} spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            id="titre"
                            label={"titre"}
                            name="titre"
                            value={currentTacheData.titre}
                            required
                            onChange={(e) => handleInputChange(e)}
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            required
                            value={currentTacheData.description}
                            onChange={(e) => handleInputChange(e)}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            select
                            required
                            id="statut"
                            label="Statut"
                            name="statut"
                            value={currentTacheData.statut}
                            onChange={handleChange}
                          >
                            <MenuItem value="">choisir statut</MenuItem>
                            <MenuItem value={"To Do"}>To Do</MenuItem>
                            <MenuItem value={"Done"}>Done</MenuItem>
                            <MenuItem value={"Doing"}>Doing</MenuItem>
                          </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            name="date"
                            id="date"
                            type="datetime-local"
                            required
                            inputProps={{
                              step: 1,
                            }}
                            format="yyyy-MM-dd HH:mm:ss"
                            onChange={(e) =>
                              setDate(e.target.value.replace("T", " "))
                            }
                            value={currentTacheData.date}
                          />
                        </Grid>
                      </Grid>
                      <CustomButtonGroup
                        handelCancel={handelCancel}
                        text={"edit"}
                      />
                      {messageSuccess && (
                        <Typography>
                          <Alert severity="success">{messageSuccess}</Alert>
                        </Typography>
                      )}
                      <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
}
