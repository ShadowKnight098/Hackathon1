import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [doctorName, setDoctorName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ================= REGISTER =================
  const handleRegister = (e) => {
    e.preventDefault();

    const doctors =
      JSON.parse(localStorage.getItem("doctors")) || [];

    // prevent duplicate email
    const alreadyExists = doctors.find(
      (doc) => doc.email === email
    );

    if (alreadyExists) {
      alert("Doctor already registered ❌");
      return;
    }

    const newDoctor = {
      id: Date.now(),
      doctorName,
      email,
      password,
    };

    doctors.push(newDoctor);

    // save all doctors
    localStorage.setItem("doctors", JSON.stringify(doctors));

    // auto login
    localStorage.setItem(
      "currentDoctor",
      JSON.stringify(newDoctor)
    );
    localStorage.setItem("isLoggedIn", "true");

    alert("Registration Successful ✅");

    navigate("/dashboard");
  };

  // ================= LOGIN =================
  const handleLogin = (e) => {
    e.preventDefault();

    const doctors =
      JSON.parse(localStorage.getItem("doctors")) || [];

    const foundDoctor = doctors.find(
      (doc) =>
        doc.email === email && doc.password === password
    );

    if (!foundDoctor) {
      alert("Invalid Credentials ❌");
      return;
    }

    // store logged doctor
    localStorage.setItem(
      "currentDoctor",
      JSON.stringify(foundDoctor)
    );

    localStorage.setItem("isLoggedIn", "true");

    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(15,23,42,0.65)",
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Card */}
      <Paper
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "420px",
          p: 5,
          borderRadius: "20px",
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
          textAlign="center"
        >
          {isRegister ? "Doctor Register" : "Clinic Login"}
        </Typography>

        <form onSubmit={isRegister ? handleRegister : handleLogin}>
          <Stack spacing={2}>
            {/* Doctor Name (Register only) */}
            {isRegister && (
              <TextField
                label="Doctor Name"
                required
                value={doctorName}
                onChange={(e) =>
                  setDoctorName(e.target.value)
                }
              />
            )}

            <TextField
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 1,
                background: "#2563EB",
                textTransform: "none",
                py: 1.3,
                fontSize: "1.1rem",
                borderRadius: "10px",
                "&:hover": {
                  background: "#1d4ed8",
                },
              }}
            >
              {isRegister ? "Register" : "Login"}
            </Button>
          </Stack>
        </form>

        {/* Toggle */}
        <Typography
          sx={{
            mt: 3,
            textAlign: "center",
            cursor: "pointer",
            color: "#2563EB",
            fontWeight: 500,
          }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Already have an account? Login"
            : "New to this site? Register"}
        </Typography>
      </Paper>
    </Box>
  );
}