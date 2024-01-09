import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useAuthToken from "../../../hooks/auth/useAuthToken";

export default function SimpleAppBar() {
  const { setAuthToken } = useAuthToken();

  const handleLogout = () => {
    setAuthToken(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
          {/* Your existing content */}
          <Typography variant="h6" color="inherit" component="div">
            Welcome To Simple Social Media
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
