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
} from "@mui/material";
import { useEffect, useState } from "react";

export default function Records() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("patients")) || [];
    setPatients(stored);
  }, []);

  // 🔍 Filter logic
  const filteredPatients = patients.filter((patient) =>
    Object.values(patient)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const handleDelete = (id) => {
    const updated = patients.filter((p) => p.id !== id);
    setPatients(updated);
    localStorage.setItem("patients", JSON.stringify(updated));
  };

  return (
    <Box
      sx={{
        minHeight: "90vh",
        background: "#f8fafc",
        px: { xs: 2, md: 6 },
        py: 6,
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Patient Records
      </Typography>

      {/* Search Bar */}
      <Stack mb={3}>
        <TextField
          label="Search by Name, Phone, ID or Disease"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Stack>

      <Paper
        sx={{
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        <Table
          sx={{
            "& .MuiTableCell-head": {
              fontSize: "1",
              fontWeight: 700,
            },
            "& .MuiTableCell-body": {
              fontSize: "16px",
            },
          }}
        ></Table>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: "15px", fontWeight: 700 }}>
                ID
              </TableCell>
              <TableCell sx={{ fontSize: "15px", fontWeight: 700 }}>
                Name
              </TableCell>
              <TableCell sx={{ fontSize: "15px", fontWeight: 700 }}>
                Phone
              </TableCell>
              <TableCell sx={{ fontSize: "15px", fontWeight: 700 }}>
                Disease
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontSize: "15px", fontWeight: 700 }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No matching patients found.
                </TableCell>
              </TableRow>
            ) : (
              filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell sx={{fontSize: "1.4rem"}}>{patient.id}</TableCell>
                  <TableCell sx={{fontSize: "1.4rem"}}>{patient.name}</TableCell>
                  <TableCell sx={{fontSize: "1.4rem"}}>{patient.phone}</TableCell>
                  <TableCell sx={{fontSize: "1.4rem"}}>{patient.disease}</TableCell>
                  <TableCell align="right">
                    <Button
                      color="error"
                      onClick={() => handleDelete(patient.id)}
                    >
                      Delete
                    </Button>
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
