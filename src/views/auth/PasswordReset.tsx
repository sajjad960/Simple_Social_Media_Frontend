import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

export default function PasswordReset() {
    const [enableResetPassword, setenableResetPassword] = React.useState(false)

  const handleGetLinkSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setenableResetPassword(true)
    console.log({
      email: data.get('email'),
      newPassword: data.get('newPassword'),
    });
  };

  const handleResetPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      newPassword: data.get('newPassword'),
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset your password
        </Typography>
        {!enableResetPassword && <Box component="form" noValidate onSubmit={handleGetLinkSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Get Reset Link
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to='/signin'>
                Remember your password? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>}
        
        {/* Handle password reset simply without token */}
        {enableResetPassword &&  <Box component="form" noValidate onSubmit={handleResetPassword} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
       
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Password
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to='/signin'>
                Remember your password? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>}
      </Box>
    </Container>
  );
}
