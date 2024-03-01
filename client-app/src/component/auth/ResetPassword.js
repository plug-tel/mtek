import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import AuthService from "services/AuthService";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();
  const form = useRef();
  const checkBtn = useRef();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  
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
  const retrieveResetPassword = () => {
    AuthService.resetPassword(token)
      .then((response) => {})
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (token) retrieveResetPassword(token);
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.resetPasswordProcess(email, password)
        .then(() => {
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
                Reset Password
              </Typography>
              <Box noValidate sx={{ mt: 1 }}>
                <Form onSubmit={handleSubmit} ref={form}>
                  <TextField
                    type="email"
                    margin="normal"
                    fullWidth
                    name="email"
                    label="email"
                    id="email"
                    variant="standard"
                    onChange={(e) => handleInputChange(e)}
                    required
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
                    required
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
                    {" "}
                    {loading && <CircularProgress />}
                    Login
                  </Button>
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
