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
  const [disease, setDisease] = useState("");
  const [otherDisease, setOtherDisease] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedDisease =
      disease === "Other" ? otherDisease : disease;

    const newPatient = {
      id: Date.now(),
      name,
      phone,
      disease: selectedDisease,
      createdAt: new Date().toISOString(),
    };

    const existingPatients =
      JSON.parse(localStorage.getItem("patients")) || [];

    localStorage.setItem(
      "patients",
      JSON.stringify([...existingPatients, newPatient])
    );

    alert("Patient Saved ");

    setName("");
    setPhone("");
    setDisease("");
    setOtherDisease("");
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
        {/* Header */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Patient Registration
        </Typography>

        <Typography sx={{ color: "#64748b", mb: 4 }}>
          Enter patient details below to add them to the clinic system.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Patient Name"
              variant="outlined"
              fullWidth
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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

            {/* Buttons Row */}
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
                  "&:hover": {
                    background: "#1d4ed8",
                  },
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