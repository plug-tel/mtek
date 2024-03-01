import React,{useState} from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import AuthService from "services/AuthService";


export default function ForgotPassword() {

  const [email, setEmail] = useState();
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();

   AuthService.forgotPassword(email) 
   .then(
    (response) => {
      setMessage(response);
      setSuccessful(true);
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
  );
} 

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
                Reset Password
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant="standard"
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <Typography mt={2}>Un lien pour définir un nouveau mot de passe sera envoyé à votre adresse e-mail.</Typography>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
