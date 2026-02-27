import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EventIcon from "@mui/icons-material/Event";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import { Link } from "react-router-dom";

const steps = [
  {
    icon: <PersonAddIcon sx={{ fontSize: 40 }} />,
    title: "Register Patient",
    desc: "Enter patient details and create a digital medical profile instantly.",
    link: "/form",
  },
  {
    icon: <EventIcon sx={{ fontSize: 40 }} />,
    title: "Schedule Appointment",
    desc: "Manage consultation schedules and organize clinic visits easily.",
    link: "/records",
  },
  {
    icon: <AssignmentTurnedInIcon sx={{ fontSize: 40 }} />,
    title: "Update Medical Records",
    desc: "Add diagnosis, prescriptions, and follow-up details digitally.",
    link: "/dashboard",
  },
];

export default function HowItWorks() {
  return (
    <Box
      sx={{
        width: "100%",
        py: 10,
        background: "#ffffff",
        px: { xs: 3, md: 8 },
      }}
    >
      {/* Section Title */}
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        gutterBottom
      >
        How It Works
      </Typography>

      <Typography
        align="center"
        sx={{ color: "#abb7c8", mb: 6 }}
      >
        A simple workflow designed for small RMP clinics.
      </Typography>

      {/* Cards */}
      <Grid container spacing={4} maxWidth={ "1200px"}
mx={"auto"}>
        {steps.map((step, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              sx={{
                height: "100%",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                textAlign: "center",
                background:"#4350dab6",
                px:1.5,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                {/* Icon */}
                <Box sx={{ color: "#ddd", mb: 2 }}>
                  {step.icon}
                </Box>

                {/* Title */}
                <Typography
                  variant="h6"
                  fontWeight={600}
                  gutterBottom
                  fontSize={"1.8rem"}
                  color="#fff"
                >
                  {step.title}
                </Typography>

                {/* Description */}
                <Typography sx={{ color: "#dfe4ea", mb: 3 }}>
                  {step.desc}
                </Typography>

                {/* Navigation Button */}
                <Button
                  component={Link}
                  to={step.link}
                  variant="contained"
                  sx={{
                    background: "#2563EB",
                    textTransform: "none",
                    borderRadius: "8px",
                    width:"100%",
                    fontSize:"1.2rem",
                    height:"4rem",
                    px: 3,
                    "&:hover": {
                      background: "#1d4ed8",
                    },
                  }}
                >
                  Go to Page →
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}