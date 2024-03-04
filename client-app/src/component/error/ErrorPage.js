import React from 'react';
import { Box, Button, Container, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';


function ErrorPage() {
  return (
    <>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">
              404
            </Typography>
            <Typography variant="h6">
             La ressource n'est pas disponible
            </Typography>
            <Button variant="contained" href='/home'>Back Home</Button>
          </Grid>
          <Grid xs={6}>
            <img
              src="https://cdn.pixabay.com/photo/2017/03/09/12/31/error-2129569__340.jpg"
              alt=""
              width={500} height={250}
            />
          </Grid>
        </Grid>
      </Container>
    
    </Box>
      <Divider variant='middle'/>
      </>
  )
}

export default ErrorPage;