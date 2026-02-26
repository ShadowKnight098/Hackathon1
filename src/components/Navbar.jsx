import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom"; // ⭐ ADD THIS

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(15,23,42,0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Toolbar sx={{ maxWidth: "1200px", width: "100%", mx: "auto" }}>
        
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            fontWeight: "bold",
            letterSpacing: 1,
            cursor: "pointer",
            textDecoration: "none",
            color: "white",
          }}
        >
          🚀 MoonDev
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        {/* Menu Items */}
        <Stack direction="row" spacing={2}>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>

          <Button component={Link} to="/about" color="inherit">
            Features
          </Button>

          <Button component={Link} to="/projects" color="inherit">
            Projects
          </Button>

          <Button component={Link} to="/contact" color="inherit">
            Contact
          </Button>
        </Stack>

        {/* Right Side Buttons */}
        <Stack direction="row" spacing={2} sx={{ ml: 3 }}>
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>


        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;