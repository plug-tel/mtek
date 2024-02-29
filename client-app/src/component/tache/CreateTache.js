import {
  Alert,
  Box,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Toolbar,
  Typography
} from "@mui/material";
import { create } from "actions/tache";
import CustomButton from "component/button/CustomButton";

import NavBar from "component/navbar/NavBar";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";

export default function CreateTache() {
  const dispatch = useDispatch();
  const form = useRef();
  const checkBtn = useRef();
  const navigate = useNavigate();
  const [messageError, setMessageError] = useState();
  const [date, setDate] = useState();
  const [statut, setStatut] = useState();
  const [tacheData, setTacheData] = useState({
    titre: "",
    description: "",
    statut: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  const [messageSuccess, setMessageSuccess] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTacheData({
      ...tacheData,
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
        titre: tacheData.titre,
        description: tacheData.description,
        statut: statut,
        date: date,
      };
      console.log("data", data.statut);
      dispatch(create(data))
        .then(() => {
          console.log(tacheData, date);
          setMessageSuccess("Tache crée avec succée!");
          setTimeout(() => navigate("/"), 1000);
        })
        .catch(() => {
          setLoading(false);
          setMessageError("Erreur lors de la creation");
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
                            required
                            value={tacheData.titre}
                            onChange={(e) => handleInputChange(e)}
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            id="description"
                            label="description"
                            name="description"
                            required
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
                            onChange={(e) => handleChange(e)}
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
                          />
                        </Grid>
                      </Grid>
                      <CustomButton
                        handelCancel={handelCancel}
                        text={"Créer"}
                      />
                      {messageError && (
                        <Typography>
                          <Alert severity="error">{messageError}</Alert>
                        </Typography>
                      )}
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
