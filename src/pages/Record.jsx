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

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(stored);
  }, []);

  const savePatients = (updated) => {
    setPatients(updated);
    localStorage.setItem("patients", JSON.stringify(updated));
  };

  // 🔥 EMAIL FUNCTION
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
      .then(() => {
        setSnack("Treatment email sent ");
      })
      .catch((error) => {
        console.error(error);
        setSnack("Email failed ");
      });
  };

  const confirmDelete = () => {
    const updated = patients.filter((p) => p.id !== deleteId);
    savePatients(updated);
    setDeleteId(null);
    setSnack("Patient deleted successfully");
  };

  // 🔥 STATUS CHANGE WITH EMAIL TRIGGER
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
    setSnack("Status updated");
  };

  const handleEditSave = () => {
    const updated = patients.map((p) =>
      p.id === editPatient.id ? editPatient : p
    );
    savePatients(updated);
    setEditPatient(null);
    setSnack("Patient updated successfully");
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
  const came = patients.filter((p) => p.status === "Came").length;
  const done = patients.filter(
    (p) => p.status === "Treatment Done"
  ).length;

  return (
    <Box sx={{ minHeight: "100vh", background: "#f8fafc", p: 5 }}>
      <Typography variant="h3" fontWeight="bold" mb={4}>
        Patient Records
      </Typography>

      {/* Dashboard */}
      <Stack direction="row" spacing={3} mb={4} flexWrap="wrap">
        {[["Total", total], ["Pending", pending], ["Came", came], ["Done", done]].map(
          ([label, value]) => (
            <Card key={label} sx={{ minWidth: 180 }}>
              <CardContent>
                <Typography fontSize="2rem" fontWeight="bold">
                  {value}
                </Typography>
                <Typography color="text.secondary">
                  {label}
                </Typography>
              </CardContent>
            </Card>
          )
        )}
      </Stack>

      {/* Search + Filter */}
      <Stack direction={{ xs: "column", md: "row" }} spacing={3} mb={4}>
        <TextField
          label="Search"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Came">Came</MenuItem>
          <MenuItem value="Treatment Done">Treatment Done</MenuItem>
        </Select>
      </Stack>

      {/* Table */}
      <Paper sx={{ p: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Disease</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.disease}</TableCell>

                <TableCell>
                  <Stack direction="row" spacing={2}>
                    <Chip
                      label={patient.status || "Pending"}
                      color={getStatusColor(patient.status)}
                    />

                    <Select
                      size="small"
                      value={patient.status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(patient.id, e.target.value)
                      }
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Came">Came</MenuItem>
                      <MenuItem value="Treatment Done">
                        Treatment Done
                      </MenuItem>
                    </Select>
                  </Stack>
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