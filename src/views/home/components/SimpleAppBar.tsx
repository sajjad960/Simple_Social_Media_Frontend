import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useAuthToken from "../../../hooks/auth/useAuthToken";
import useProfile from "../../../hooks/useProfile";
import { useEffect } from "react";
import useSnackbarError from "../../../hooks/useSnackbarError";

export default function SimpleAppBar() {
  const { setAuthToken } = useAuthToken();
  const { profile, errorProfile } = useProfile();
  const showErrorSnackbar = useSnackbarError();
console.log("app bar");
  useEffect(() => {
    if(errorProfile) return showErrorSnackbar({ error: errorProfile?.message });  
  }, [errorProfile, showErrorSnackbar]);

  const handleLogout = () => {
    setAuthToken(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
          {/* Your existing content */}
          <Typography variant="h6" color="inherit" component="div">
            Hey {profile?.name}, Welcome To Simple Social Media
          </Typography>

          <Button
            color="inherit"
            sx={{ fontSize: "1rem" }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
