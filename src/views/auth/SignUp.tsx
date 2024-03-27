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
import { useMutation } from "@tanstack/react-query";
import useAuthToken from "../../hooks/auth/useAuthToken";
import { SignUpParams, SignUpResponse } from "../../api/Common/types";
import { Link, useNavigate } from "react-router-dom";
import useRedirectIfTokenExists from "../../hooks/useRedirectIfTokenExists";
import useProfile from "../../hooks/useProfile";
import useSnackbarError from "../../hooks/useSnackbarError";

type ErrorsTypes = {
  name: string,
  userName: string,
  email: string,
  password: string
}

type customError = {
  message: string;
  errors: object[];
};
export default function SignUp() {
  useRedirectIfTokenExists();
  const api = useApi({ formData: false });
  const { setAuthToken } = useAuthToken();
  const navigate = useNavigate();
  const { setProfile } = useProfile();
  const showErrorMessage = useSnackbarError();
  const [errors, seterrors] = React.useState<ErrorsTypes | null>();

  const { mutate } = useMutation({
    mutationFn: (params: SignUpParams) => api.signUp(params),
    onSuccess: (data: SignUpResponse) => {
      setAuthToken(data?.token);
      setProfile(data?.user);
      navigate("/");
    },
    onError: (error: customError) => {
      if (error.errors) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const singleObjectWithValues = error.errors.reduce((acc: any, obj) => {
          Object.entries(obj).forEach(([key, value]) => {
            acc[key] = value;
          });
          return acc;
        }, {});
        seterrors(singleObjectWithValues);
      } else {
        seterrors(null)
        showErrorMessage({error: error.message})
      }
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const bodyData: SignUpParams = {
      name: data.get("name"),
      userName: data.get("userName"),
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                error={errors?.name && true || false}
                helperText={errors?.name && errors?.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="userName"
                required
                fullWidth
                id="userName"
                label="User Name"
                error={errors?.userName && true || false}
                helperText={errors?.userName && errors?.userName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={errors?.email && true || false}
                helperText={errors?.email && errors?.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={errors?.password && true || false}
                helperText={errors?.password && errors?.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/signin">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
