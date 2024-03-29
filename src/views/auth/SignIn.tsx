import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";

import useApi from "../../hooks/useApi";
import { SignInParams, SignInResponse } from "../../api/Common/types";
import { useMutation } from "@tanstack/react-query";
import useAuthToken from "../../hooks/auth/useAuthToken";
import { Link, useNavigate } from "react-router-dom";
import useRedirectIfTokenExists from "../../hooks/useRedirectIfTokenExists";
import useProfile from "../../hooks/useProfile";
import useSnackbarError from "../../hooks/useSnackbarError";

export default function SignIn() {
  useRedirectIfTokenExists();
  const api = useApi({ formData: false });
  const { setAuthToken } = useAuthToken();
  const navigate = useNavigate();
  const { setProfile } = useProfile();
  const showErrorMessage = useSnackbarError();


  const { mutate } = useMutation({
    mutationFn: (params: SignInParams) => api.signIn(params),
    onSuccess: (data: SignInResponse) => {
      setAuthToken(data?.token);
      setProfile(data?.user);
      navigate("/");
    },
    onError: (error) => {
      showErrorMessage({error: error.message})
    }
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const bodyData: SignInParams = {
      email: data.get("email"),
      password: data.get("password"),
    };
    mutate(bodyData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link to="/resetPassword">Forgot password?</Link> */}
            </Grid>
            <Grid item>
              <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
