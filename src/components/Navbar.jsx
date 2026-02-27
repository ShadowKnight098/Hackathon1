import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loginStatus === "true");

    const doctor = JSON.parse(localStorage.getItem("doctor"));
    if (doctor && doctor.doctorName) {
      setDoctorName(doctor.doctorName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

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
              fontSize: "1.5rem",
              py: 0.8,
              border: "1px solid rgba(255,255,255,0.25)",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.08)",
                borderColor: "#3b82f6",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(59,130,246,0.35)",
              },
            },
          }}
        >
          <Button component={Link} to="/">
            Home
          </Button>

          <Button component={Link} to="/form">
            Patient Form
          </Button>

          <Button component={Link} to="/records">
            Records
          </Button>

          <Button component={Link} to="/dashboard">
            Dashboard
          </Button>

          {/* Conditional Button */}
          {!isLoggedIn ? (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              sx={{
                background: "#2563EB",
                border: "none",
                "&:hover": {
                  background: "#1d4ed8",
                },
              }}
            >
              Login
            </Button>
          ) : (
            <>
              <Typography
                sx={{
                  color: "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Dr. {doctorName}
              </Typography>

              <Button
                variant="contained"
                onClick={handleLogout}
                sx={{
                  background: "#dc2626",
                  border: "none",
                  "&:hover": {
                    background: "#b91c1c",
                  },
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;