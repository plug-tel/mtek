import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { login } from "actions/auth";
import NavBar from "component/navbar/NavBar";


const required = (value) => {
  if (!value) {
    return <Alert severity="error">This field is required!</Alert>;
  }
};
export default function SignIn() {
  const navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);


  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    }
    if (id === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(email, password))
        .then((response) => {
         
          navigate("/home");
         
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  return (
      <Container sx={{ py: 10 }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "brown",
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography component="h1" variant="h5" align="center">
                  Login
                </Typography>
                <Box noValidate sx={{ mt: 1 }}>
                  <Form onSubmit={handleSubmit} ref={form}>
                    <TextField
                      type="text"
                      margin="normal"
                      fullWidth
                      name="email"
                      label="email"
                      id="email"
                      variant="standard"
                      onChange={(e) => handleInputChange(e)}
                      validations={[required]}
                      value={email}
                      autoFocus
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      name="password"
                      label="password"
                      type="password"
                      id="password"
                      variant="standard"
                      validations={[required]}
                      value={password}
                      autoComplete="current-password"
                      onChange={(e) => handleInputChange(e)}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={loading}
                    >
                      {loading && <CircularProgress />}
                     Login
                    </Button>
                    <Box sx={{ display: "flex" }}>
                      <Link href="/forgotPassword" variant="body2">
                        Forgot Password
                      </Link>
                    </Box>
                    <Box sx={{ display: "inline-flex", mt: 2 }}>
                      <Typography>Vous n'avez pas de compte?</Typography>
                      <Typography><Link href="/SignUp">Sign Up</Link> </Typography>
                    </Box>
                   
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                  </Form>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
</Container>
  );
}
