import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Dashboard() {
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

  /* ================= GREETING ================= */

  const hour = new Date().getHours();
  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  /* ================= BASIC STATS ================= */

  const totalPatients = patients.length;

  const todayPatients = patients.filter((p) => {
    const today = new Date().toDateString();
    return new Date(p.createdAt).toDateString() === today;
  }).length;

  /* ================= DOCTOR ANALYTICS ================= */

  const doctorAnalytics = patients.reduce((acc, patient) => {
    const doctor = patient.doctorName || "Unknown";

    if (!acc[doctor]) {
      acc[doctor] = {
        totalCases: 0,
        diseases: {},
        patients: [],
      };
    }

    acc[doctor].totalCases += 1;

    const disease = patient.disease || "Unknown";
    acc[doctor].diseases[disease] =
      (acc[doctor].diseases[disease] || 0) + 1;

    acc[doctor].patients.push(patient.name);

    return acc;
  }, {});

  const doctorData = Object.entries(doctorAnalytics);

  const topDoctor =
    doctorData.sort((a, b) => b[1].totalCases - a[1].totalCases)[0]?.[0] ||
    "N/A";

  /* ================= DISEASE ANALYTICS ================= */

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
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        minHeight: "90vh",
        background: "#f8fafc",
        px: { xs: 2, md: 6 },
        py: 6,
      }}
    >
      {/* HEADER */}
      <Typography variant="h4" fontWeight="bold">
        {greeting}, Dr. {doctorName || "Admin"}
      </Typography>

      <Typography sx={{ color: "#64748b", mb: 4 }}>
        Hospital performance overview
      </Typography>

      {/* ================= STATS ================= */}
      <Grid container spacing={3} mb={5}>
        <StatCard title="Total Patients" value={totalPatients} />
        <StatCard title="Patients Today" value={todayPatients} />
        <StatCard title="Top Doctor" value={topDoctor} />
        <StatCard
          title="Most Common Disease"
          value={mostCommonDisease}
        />
      </Grid>

      <Divider sx={{ mb: 4 }} />

      {/* ================= DOCTOR PERFORMANCE ================= */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Doctor Analytics
      </Typography>

      <Paper sx={tableStyle}>
        <Table>
          <TableHead sx={{ background: "#f1f5f9" }}>
            <TableRow>
              <TableCell sx={headCell}>Doctor</TableCell>
              <TableCell sx={headCell}>Cases</TableCell>
              <TableCell sx={headCell}>Diseases Treated</TableCell>
              <TableCell sx={headCell}>Patients</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {doctorData.map(([doctor, data]) => (
              <TableRow
                key={doctor}
                sx={
                  doctor === topDoctor
                    ? { background: "#ecfeff" }
                    : {}
                }
              >
                <TableCell>{doctor}</TableCell>
                <TableCell>{data.totalCases}</TableCell>

                <TableCell>
                  {Object.keys(data.diseases).join(", ")}
                </TableCell>

                <TableCell>
                  {data.patients.slice(0, 3).join(", ")}
                  {data.patients.length > 3 && " ..."}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Divider sx={{ my: 5 }} />

      {/* ================= RECENT PATIENTS ================= */}
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Recent Patients
      </Typography>

      <Paper sx={tableStyle}>
        <Table>
          <TableHead sx={{ background: "#f1f5f9" }}>
            <TableRow>
              <TableCell sx={headCell}>Name</TableCell>
              <TableCell sx={headCell}>Doctor</TableCell>
              <TableCell sx={headCell}>Disease</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {recentPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No patients yet.
                </TableCell>
              </TableRow>
            ) : (
              recentPatients.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.doctorName}</TableCell>
                  <TableCell>{p.disease}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

/* ================= COMPONENT ================= */

function StatCard({ title, value }) {
  return (
    <Grid item xs={12} md={3}>
      <Paper
        component={motion.div}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        sx={cardStyle}
      >
        <Typography variant="h5" fontWeight="bold">
          {value}
        </Typography>
        <Typography sx={{ color: "#64748b" }}>
          {title}
        </Typography>
      </Paper>
    </Grid>
  );
}

/* ================= STYLES ================= */

const cardStyle = {
  p: 4,
  borderRadius: "16px",
  border: "1px solid #e2e8f0",
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