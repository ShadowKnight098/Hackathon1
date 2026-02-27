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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [doctorName, setDoctorName] = useState("");

  // ================= REGISTER =================
  const handleRegister = (e) => {
    e.preventDefault();

    const doctors =
      JSON.parse(localStorage.getItem("doctors")) || [];

    // check duplicate email
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

    localStorage.setItem("doctors", JSON.stringify(doctors));

    alert("Registration Successful ✅");
    setIsRegister(false);
  };

  // ================= LOGIN =================
  const handleLogin = (e) => {
    e.preventDefault();

    const doctors =
      JSON.parse(localStorage.getItem("doctors")) || [];

    const foundDoctor = doctors.find(
      (doc) => doc.email === email && doc.password === password
    );

    if (foundDoctor) {
      // store logged doctor
      localStorage.setItem(
        "currentDoctor",
        JSON.stringify(foundDoctor)
      );

      localStorage.setItem("isLoggedIn", "true");

      navigate("/dashboard");
    } else {
      alert("Invalid Credentials ❌");
    }
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
      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(15,23,42,0.65)",
          backdropFilter: "blur(4px)",
        }}
      />

      <Paper
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "420px",
          p: 5,
          borderRadius: "20px",
          background: "rgba(255,255,255,0.95)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          fontSize={"2.5rem"}
        >
          {isRegister ? "Doctor Register" : "Clinic Login"}
        </Typography>

        <form onSubmit={isRegister ? handleRegister : handleLogin}>
          <Stack spacing={2}>
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
                mt: 2,
                background: "#2563EB",
                textTransform: "none",
                py: 1.2,
                fontSize: "1.2rem",
                borderRadius: "10px",
              }}
            >
              {isRegister ? "Register" : "Login"}
            </Button>
          </Stack>
        </form>

        <Typography
          sx={{
            mt: 3,
            textAlign: "center",
            cursor: "pointer",
            fontSize: "1.2rem",
            color: "#2563EB",
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