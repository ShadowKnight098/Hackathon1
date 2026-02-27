import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  Stack,
  Chip,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Snackbar,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Records() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deleteId, setDeleteId] = useState(null);
  const [editPatient, setEditPatient] = useState(null);
  const [snack, setSnack] = useState("");

  const currentDoctor = JSON.parse(
    localStorage.getItem("currentDoctor")
  );

  // ✅ Load only logged doctor's patients
  useEffect(() => {
    const allPatients =
      JSON.parse(localStorage.getItem("patients")) || [];

    if (!currentDoctor) return;

    const myPatients = allPatients.filter(
      (p) => p.doctorId === currentDoctor.id
    );

    setPatients(myPatients);
  }, []);

  // ✅ Safe save (preserve other doctors)
  const savePatients = (updatedDoctorPatients) => {
    const allPatients =
      JSON.parse(localStorage.getItem("patients")) || [];

    const otherDoctorsPatients = allPatients.filter(
      (p) => p.doctorId !== currentDoctor.id
    );

    const merged = [
      ...otherDoctorsPatients,
      ...updatedDoctorPatients,
    ];

    localStorage.setItem("patients", JSON.stringify(merged));
    setPatients(updatedDoctorPatients);
  };

  // EMAIL
  const sendTreatmentEmail = (patient) => {
    if (!patient.email) {
      setSnack("Patient email not found ❌");
      return;
    }

    emailjs
      .send(
        "service_wspnj8c",
        "template_vc9xi8v",
        {
          name: patient.name,
          disease: patient.disease,
          email: patient.email,
        },
        "8T0qcnzODMGiNPSLU"
      )
      .then(() => setSnack("Treatment email sent "))
      .catch(() => setSnack("Email failed "));
  };

  const confirmDelete = () => {
    const updated = patients.filter((p) => p.id !== deleteId);
    savePatients(updated);
    setDeleteId(null);
    setSnack("Patient deleted");
  };

  const handleStatusChange = (id, newStatus) => {
    const updated = patients.map((p) => {
      if (p.id === id) {
        if (
          newStatus === "Treatment Done" &&
          p.status !== "Treatment Done"
        ) {
          sendTreatmentEmail(p);
        }
        return { ...p, status: newStatus };
      }
      return p;
    });

    savePatients(updated);
  };

  const handleEditSave = () => {
    const updated = patients.map((p) =>
      p.id === editPatient.id ? editPatient : p
    );
    savePatients(updated);
    setEditPatient(null);
    setSnack("Patient updated");
  };

  const getStatusColor = (status) => {
    if (status === "Came") return "info";
    if (status === "Treatment Done") return "success";
    return "warning";
  };

  const filteredPatients = patients
    .filter((p) =>
      Object.values(p)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((p) =>
      statusFilter === "All"
        ? true
        : (p.status || "Pending") === statusFilter
    );

  const total = patients.length;
  const pending = patients.filter(
    (p) => (p.status || "Pending") === "Pending"
  ).length;
  const done = patients.filter(
    (p) => p.status === "Treatment Done"
  ).length;

  return (
    <Box sx={{ minHeight: "100vh", background: "#f8fafc", p: 6 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Dr. {currentDoctor?.doctorName}'s Patients
      </Typography>

      <Typography sx={{ color: "#64748b", mb: 4, fontSize: "1.1rem" }}>
        Manage and track your patient records efficiently.
      </Typography>

      <Divider sx={{ mb: 4 }} />

      {/* Summary Cards */}
      <Stack direction="row" spacing={3} mb={5}>
        {[["Total", total], ["Pending", pending], ["Done", done]].map(
          ([label, value]) => (
            <Card key={label} sx={{ minWidth: 200 }}>
              <CardContent>
                <Typography fontSize="2.2rem" fontWeight="bold">
                  {value}
                </Typography>
                <Typography fontSize="1.1rem" color="text.secondary">
                  {label}
                </Typography>
              </CardContent>
            </Card>
          )
        )}
      </Stack>

      {/* Search + Filter */}
      <Stack direction="row" spacing={3} mb={4}>
        <TextField
          label="Search Patient"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Treatment Done">Treatment Done</MenuItem>
        </Select>
      </Stack>

      {/* Table */}
      <Paper sx={{ p: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={headStyle}>ID</TableCell>
              <TableCell sx={headStyle}>Name</TableCell>
              <TableCell sx={headStyle}>Phone</TableCell>
              <TableCell sx={headStyle}>Disease</TableCell>
              <TableCell sx={headStyle}>Date</TableCell>
              <TableCell sx={headStyle}>Status</TableCell>
              <TableCell sx={headStyle} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.disease}</TableCell>
                <TableCell>{patient.date}</TableCell>

                <TableCell>
                  <Chip
                    label={patient.status || "Pending"}
                    color={getStatusColor(patient.status)}
                  />
                </TableCell>

                <TableCell align="right">
                  <Button onClick={() => setEditPatient(patient)}>
                    Edit
                  </Button>
                  <Button
                    color="error"
                    onClick={() => setDeleteId(patient.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Delete Dialog */}
      <Dialog open={Boolean(deleteId)}>
        <DialogTitle>Delete Patient?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={Boolean(editPatient)} fullWidth>
        <DialogTitle>Edit Patient</DialogTitle>
        {editPatient && (
          <DialogContent>
            <Stack spacing={3} mt={2}>
              <TextField
                label="Name"
                value={editPatient.name}
                onChange={(e) =>
                  setEditPatient({ ...editPatient, name: e.target.value })
                }
              />
              <TextField
                label="Phone"
                value={editPatient.phone}
                onChange={(e) =>
                  setEditPatient({ ...editPatient, phone: e.target.value })
                }
              />
              <TextField
                label="Disease"
                value={editPatient.disease}
                onChange={(e) =>
                  setEditPatient({ ...editPatient, disease: e.target.value })
                }
              />
            </Stack>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={() => setEditPatient(null)}>Cancel</Button>
          <Button onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={Boolean(snack)}
        autoHideDuration={3000}
        message={snack}
        onClose={() => setSnack("")}
      />
    </Box>
  );
}

const headStyle = {
  fontSize: "1.1rem",
  fontWeight: "bold",
};