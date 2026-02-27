import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(15,23,42,0.9)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Toolbar sx={{ maxWidth: "1200px", width: "100%", mx: "auto" }}>
        
        {/* Logo */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            fontWeight: "bold",
            textDecoration: "none",
            color: "white",
            // fontSize:"2rem"
          }}
        >
          🩺 MoonDev Clinic
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* Menu */}
<Stack
  direction="row"
  spacing={2}
  sx={{
    "& .MuiButton-root": {
      color: "white",
      fontWeight: 500,
      textTransform: "none",
      borderRadius: "10px",
      px: 2.5,
      fontSize:"1.45rem",
      py: 0.8,

      // ✅ Border always visible
      border: "1px solid rgba(255,255,255,0.25)",

      // ✅ Smooth animation
      transition: "all 0.3s ease",

      // ✅ Hover effect
      "&:hover": {
        backgroundColor: "rgba(255,255,255,0.08)",
        borderColor: "#3b82f6",
        transform: "translateY(-2px)",
        boxShadow: "0 6px 16px rgba(59,130,246,0.35)",
      },
    },
  }}
>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>

          <Button component={Link} to="/form" color="inherit">
            Patient Form
          </Button>

          <Button component={Link} to="/records" color="inherit">
            Records
          </Button>

          <Button component={Link} to="/dashboard" color="inherit">
            Dashboard
          </Button>

          <Button
            component={Link}
            to="/login"
            variant="contained"
            sx={{
              background: "#2563EB",
              px: 3,
              borderRadius: "10px",
              "&:hover": {
                background: "#1d4ed8",
              },
            }}
          >
            Login
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;