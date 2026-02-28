import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  MenuItem,
  Divider,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";

/* ===== EMAILJS CONFIG ===== */
const SERVICE_ID = "service_wspnj8c";
const PUBLIC_KEY = "8T0qcnzODMGiNPSLU";
const TEMPLATE_DOCTOR = "template_y8tg2ae"; // doctor template only

export default function Appointment() {
  const formRef = useRef();

  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [disease, setDisease] = useState("");
  const [otherDisease, setOtherDisease] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [snack, setSnack] = useState("");
  const [loading, setLoading] = useState(false);

  /* ===== LOAD DOCTORS ===== */
  useEffect(() => {
    const storedDoctors =
      JSON.parse(localStorage.getItem("doctors")) || [];
    setDoctors(storedDoctors);
  }, []);

  /* ===== SUBMIT ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const selectedDoctor = doctors.find(
      (doc) => doc.id === doctorId
    );

    if (!selectedDoctor) {
      setSnack("Please select a doctor");
      setLoading(false);
      return;
    }

    const finalDisease =
      disease === "Other" ? otherDisease.trim() : disease;

    if (!finalDisease) {
      setSnack("Please select disease");
      setLoading(false);
      return;
    }

    const newAppointment = {
      id: Date.now(),
      patientName,
      patientEmail,
      phone,
      disease: finalDisease,
      appointmentDate: date,
      appointmentTime: time,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.doctorName,
      status: "Booked",
      createdAt: new Date().toISOString(),
    };

    /* ===== SAVE ===== */
    const appointments =
      JSON.parse(localStorage.getItem("appointments")) || [];

    appointments.push(newAppointment);

    localStorage.setItem(
      "appointments",
      JSON.stringify(appointments)
    );

    // trigger dashboard notification
    localStorage.setItem("newAppointment", Date.now());

    /* ===== SEND EMAIL (DOCTOR ONLY) ===== */
    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_DOCTOR,
        formRef.current,
        PUBLIC_KEY
      );

      setSnack("Appointment booked & doctor notified ✓");
    } catch (err) {
      console.error(err);
      setSnack("Appointment saved but email failed");
    } finally {
      setLoading(false);
    }

    /* ===== RESET ===== */
    setPatientName("");
    setPatientEmail("");
    setPhone("");
    setDisease("");
    setOtherDisease("");
    setDoctorId("");
    setDate("");
    setTime("");
  };

  const selectedDoctor = doctors.find(
    (d) => d.id === doctorId
  );

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
          Book Appointment
        </Typography>

        <Typography sx={{ color: "#64748b", mb: 4 }}>
          Choose doctor and schedule your visit.
        </Typography>

        <Divider sx={{ mb: 4 }} />

        <form ref={formRef} onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Hidden fields for EmailJS */}
            <input
              type="hidden"
              name="doctor_name"
              value={selectedDoctor?.doctorName || ""}
            />
            <input type="hidden" name="appointment_date" value={date} />
            <input type="hidden" name="appointment_time" value={time} />
            <input type="hidden" name="patient_phone" value={phone} />
            <input type="hidden" name="patient_email" value={patientEmail} />
            <input
              type="hidden"
              name="disease"
              value={disease === "Other" ? otherDisease : disease}
            />

            <TextField
              label="Patient Name"
              name="patient_name"
              required
              fullWidth
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />

            <TextField
              label="Email Address"
              type="email"
              required
              fullWidth
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
            />

            <TextField
              label="Phone Number"
              required
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <TextField
              select
              label="Disease"
              required
              fullWidth
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
                required
                fullWidth
                value={otherDisease}
                onChange={(e) =>
                  setOtherDisease(e.target.value)
                }
              />
            )}

            <TextField
              select
              label="Select Doctor"
              required
              fullWidth
              value={doctorId}
              onChange={(e) =>
                setDoctorId(Number(e.target.value))
              }
            >
              {doctors.map((doc) => (
                <MenuItem key={doc.id} value={doc.id}>
                  Dr. {doc.doctorName}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              type="date"
              label="Appointment Date"
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />

            <TextField
              type="time"
              label="Appointment Time"
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                background: "#2563EB",
                textTransform: "none",
                py: 1.5,
                fontSize: "1.1rem",
                borderRadius: "10px",
                "&:hover": { background: "#1d4ed8" },
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 2, color: "white" }} />
                  Processing...
                </>
              ) : (
                "Book Appointment"
              )}
            </Button>
          </Stack>
        </form>
      </Paper>

      <Snackbar
        open={Boolean(snack)}
        autoHideDuration={6000}
        message={snack}
        onClose={() => setSnack("")}
      />
    </Box>
  );
}