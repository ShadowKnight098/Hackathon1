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
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Dashboard() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const storedPatients =
      JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(storedPatients);

    const doctor = JSON.parse(localStorage.getItem("doctor"));
    if (doctor?.doctorName) {
      setDoctorName(doctor.doctorName);
    }
  }, []);

  // Greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  // Stats
  const totalPatients = patients.length;

  const todayPatients = patients.filter((p) => {
    const today = new Date().toDateString();
    return new Date(p.createdAt).toDateString() === today;
  }).length;

  // Disease analytics
  const diseaseCounts = patients.reduce((acc, patient) => {
    acc[patient.disease] = (acc[patient.disease] || 0) + 1;
    return acc;
  }, {});

  const mostCommonDisease =
    Object.entries(diseaseCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
    "N/A";

  const recentPatients = [...patients].reverse().slice(0, 5);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        minHeight: "90vh",
        background: "#f8fafc",
        px: { xs: 2, md: 6 },
        py: 6,
      }}
    >
      {/* Header */}
      <Typography variant="h4" fontWeight="bold">
        {greeting}, Dr. {doctorName || "Doctor"} 👋
      </Typography>

      <Typography sx={{ color: "#64748b", mb: 4 }}>
        Here’s your clinic performance overview.
      </Typography>

      {/* Stats Cards */}
      <Grid
        container
        spacing={3}
        mb={5}
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {[{
          title: "Total Patients",
          value: totalPatients,
        },
        {
          title: "Patients Today",
          value: todayPatients,
        },
        {
          title: "Most Common Disease",
          value: mostCommonDisease,
        }].map((card, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              component={motion.div}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              sx={cardStyle}
            >
              <Typography variant="h5" fontWeight="bold">
                {card.value}
              </Typography>
              <Typography sx={{ color: "#64748b" }}>
                {card.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Stack direction="row" spacing={2} mb={5}>
        <Button
          variant="contained"
          onClick={() => navigate("/form")}
          sx={{ textTransform: "none" }}
        >
          ➕ Add Patient
        </Button>

        <Button
          variant="outlined"
          onClick={() => navigate("/records")}
          sx={{ textTransform: "none" }}
        >
          📋 View Records
        </Button>
      </Stack>

      <Divider sx={{ mb: 4 }} />

      {/* Disease Distribution */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Disease Distribution
      </Typography>

      <Grid container spacing={2} mb={5}>
        {Object.entries(diseaseCounts).map(([disease, count]) => (
          <Grid item xs={12} md={4} key={disease}>
            <Paper
              component={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              sx={cardStyle}
            >
              <Typography fontWeight="bold">{disease}</Typography>
              <Typography sx={{ color: "#64748b" }}>
                {count} cases
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Recent Patients */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Recent Patients
      </Typography>

      <Paper
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        sx={tableStyle}
      >
        <Table>
          <TableHead sx={{ background: "#f1f5f9" }}>
            <TableRow>
              <TableCell sx={headCell}>Name</TableCell>
              <TableCell sx={headCell}>Phone</TableCell>
              <TableCell sx={headCell}>Disease</TableCell>
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
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.disease}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

// Styles
const cardStyle = {
  p: 4,
  borderRadius: "16px",
  border: "1px solid #e2e8f0",
  transition: "0.3s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
};

const tableStyle = {
  borderRadius: "16px",
  border: "1px solid #e2e8f0",
  overflow: "hidden",
};

const headCell = {
  fontSize: "16px",
  fontWeight: 700,
};