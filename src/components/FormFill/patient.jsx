import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  MenuItem,
  Stack,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [disease, setDisease] = useState("");
  const [otherDisease, setOtherDisease] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedDisease =
      disease === "Other" ? otherDisease : disease;

    // ✅ Get logged doctor
    const currentDoctor = JSON.parse(
      localStorage.getItem("currentDoctor")
    );

    if (!currentDoctor) {
      alert("No doctor logged in ❌");
      return;
    }

    const now = new Date();

    const newPatient = {
      id: Date.now(),
      name,
      phone,
      email,
      disease: selectedDisease,
      status: "Pending",

      // ✅ multi doctor support
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.doctorName,

      // ✅ timestamp
      createdAt: now.toISOString(),
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const existingPatients =
      JSON.parse(localStorage.getItem("patients")) || [];

    localStorage.setItem(
      "patients",
      JSON.stringify([...existingPatients, newPatient])
    );

    // 🔥 TOAST TRIGGER (important)
    localStorage.setItem("newPatientAdded", "true");

    // optional: store latest patient name
    localStorage.setItem("latestPatient", name);

    alert("Patient Saved Successfully ✅");

    // reset form
    setName("");
    setPhone("");
    setEmail("");
    setDisease("");
    setOtherDisease("");

    // optional redirect
    navigate("/records");
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        background: "#f8fafc",
        display: "flex",
        justifyContent: "center",
        pt: 10,
        px: 2,
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: "700px",
          p: 6,
          borderRadius: "20px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Patient Registration
        </Typography>

        <Typography sx={{ color: "#64748b", mb: 4 }}>
          Enter patient details below to add them to the hospital system.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Patient Name"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Phone Number"
              fullWidth
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <TextField
              label="Email Address"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              select
              label="Disease"
              fullWidth
              required
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
            >
              <MenuItem value="Fever">Fever</MenuItem>
              <MenuItem value="Cold">Cold</MenuItem>
              <MenuItem value="Headache">Headache</MenuItem>
              <MenuItem value="Infection">Infection</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>

            {disease === "Other" && (
              <TextField
                label="Specify Disease"
                fullWidth
                required
                value={otherDisease}
                onChange={(e) =>
                  setOtherDisease(e.target.value)
                }
              />
            )}

            <Stack direction="row" spacing={2} mt={2}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  background: "#2563EB",
                  textTransform: "none",
                  py: 1.3,
                  borderRadius: "10px",
                  "&:hover": { background: "#1d4ed8" },
                }}
              >
                Save Patient
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate("/records")}
                sx={{
                  textTransform: "none",
                  borderRadius: "10px",
                }}
              >
                View Records
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}