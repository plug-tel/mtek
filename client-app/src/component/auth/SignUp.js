import React, { useState,useRef } from "react";
import {Alert,Box,Button,Card,CardContent,Container,Divider,Grid,TextField,Typography,} from "@mui/material";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { useNavigate } from "react-router-dom";
import AuthService from "services/AuthService";
import NavBar from "component/navbar/NavBar";

const required = (value) => {
  if (!value) {
    return <Alert severity="error">This field is required!</Alert>;
  }
};

export default function SignUp() {
  const navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();
  const [message, setMessage] = useState("");
  const [messageSuccess, setMessageSuccess] = useState();
  const [successful, setSuccessful] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({email: "", password: "", username: ""});
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
 
  

  const handleRegister = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {   
      AuthService.register(formData.username,formData.email, formData.password)
         .then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          setMessageSuccess("Authentifiction successfully!");
          navigate("/home")
        },
       
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setSuccessful(false);
          setMessage(resMessage);
        }
      )} else {
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
                  Sign Up
                </Typography>
                <Box
                 
                  noValidate
                  sx={{ mt: 1 }}
                >
              <Form onSubmit={handleRegister} ref={form}>
                    <TextField
                      autoFocus
                      margin="normal"
                      required
                      fullWidth
                      name="username"
                      label="username"
                      type="text"
                      id="username"
                      variant="standard"
                      onChange={(e) => handleInputChange(e)}
                    />
                
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      variant="standard"
                      onChange={(e) => handleInputChange(e)}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="password"
                      type="password"
                      id="password"
                      variant="standard"
                      autoComplete="current-password"
                      onChange={(e) => handleInputChange(e)}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Login
                    </Button>
                    {message && (
                      <Typography>
                        <Alert severity="error">{message}</Alert>
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
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

  );
}
