import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    // Fetch patients
    const storedPatients =
      JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(storedPatients);

    // Fetch doctor info
    const doctor = JSON.parse(localStorage.getItem("doctor"));

    if (doctor && doctor.doctorName) {
      setDoctorName(doctor.doctorName);
    }
  }, []);

  // 📊 Stats
  const totalPatients = patients.length;

  const todayPatients = patients.filter((p) => {
    const today = new Date().toDateString();
    return new Date(p.createdAt).toDateString() === today;
  }).length;

  const recentPatients = [...patients].reverse().slice(0, 5);

  return (
    <Box
      sx={{
        minHeight: "90vh",
        background: "#f8fafc",
        px: { xs: 2, md: 6 },
        py: 6,
      }}
    >
      {/* Welcome Section */}
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Welcome Dr. {doctorName || "Doctor"}       </Typography>

      <Typography sx={{ color: "#64748b", mb: 4 }}>
        Here’s your clinic overview for today.
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={5}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              {totalPatients}
            </Typography>
            <Typography sx={{ color: "#64748b" }}>
              Total Patients
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              borderRadius: "16px",
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography variant="h5" fontWeight="bold">
              {todayPatients}
            </Typography>
            <Typography sx={{ color: "#64748b" }}>
              Patients Today
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Stack direction="row" spacing={2} mb={5}>
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={() => navigate("/form")}
        >
          ➕ Add Patient
        </Button>

        <Button
          variant="outlined"
          sx={{ textTransform: "none" }}
          onClick={() => navigate("/records")}
        >
          📋 View Records
        </Button>
      </Stack>

      {/* Recent Patients */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Recent Patients
      </Typography>

      <Paper
        sx={{
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead sx={{ background: "#f1f5f9" }}>
            <TableRow>
              <TableCell sx={{ fontSize: "16px", fontWeight: 700 }}>
                Name
              </TableCell>
              <TableCell sx={{ fontSize: "16px", fontWeight: 700 }}>
                Phone
              </TableCell>
              <TableCell sx={{ fontSize: "16px", fontWeight: 700 }}>
                Disease
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {recentPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No patients added yet.
                </TableCell>
              </TableRow>
            ) : (
              recentPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell sx={{ fontSize: "15px" }}>
                    {patient.name}
                  </TableCell>
                  <TableCell sx={{ fontSize: "15px" }}>
                    {patient.phone}
                  </TableCell>
                  <TableCell sx={{ fontSize: "15px" }}>
                    {patient.disease}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}