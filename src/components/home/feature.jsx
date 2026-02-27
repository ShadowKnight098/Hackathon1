import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import InsightsIcon from "@mui/icons-material/Insights";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import { motion } from "framer-motion";
import DescriptionIcon from "@mui/icons-material/Description";

const features = [
  {
    icon: <MedicalServicesIcon sx={{ fontSize: 40 }} />,
    title: "Digital Patient Records",
    desc: "Securely store diagnosis, prescriptions, and medical history digitally.",
  },
  {
    icon: <EventAvailableIcon sx={{ fontSize: 40 }} />,
    title: "Appointment Scheduling",
    desc: "Easily manage patient bookings and consultation timings.",
  },
  {
    icon: <InsightsIcon sx={{ fontSize: 40 }} />,
    title: "Clinic Dashboard",
    desc: "Track total patients, daily visits, and clinic performance.",
  },
  {
    icon: <PeopleIcon sx={{ fontSize: 40 }} />,
    title: "Patient Management",
    desc: "Search, update, and manage patient information efficiently.",
  },
  {
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    title: "Secure Data Storage",
    desc: "Protect sensitive medical data with structured digital storage.",
  },
  {
    icon: <DescriptionIcon sx={{ fontSize: 40 }} />,
    title: "Prescription Records",
    desc: "Maintain digital prescriptions for better follow-up care.",
  },
];

export default function Features() {
  return (
    <Box   component={motion.div}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}sx={{ py: 10, px: { xs: 3, md: 8 }, background: "#f8fafc" }}>
      
      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        gutterBottom
        fontSize={"2.4rem"}
      >
        Key Features
      </Typography>

      <Typography
        align="center"
        sx={{ color: "#64748b", mb: 6,
            fontSize:"1.8rem"
         }}
      >
        Designed specifically for small RMP clinics to modernize healthcare management.
      </Typography>

      <Grid container spacing={4} width={"100%"} maxWidth={ "1200px"}
mx={"auto"}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} >
            <Card
              sx={{
                marginRight:"2rem",
                p: 3,
                height: "100%",
                widt:'100%',
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                textAlign: "center",
                transition: "0.3s",
                alignContent:"center",
                justifyContent:"center",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                },
              }}
            >
              <CardContent>
                <Box sx={{ color: "#2563EB", mb: 2 }}>
                  {feature.icon}
                </Box>

                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {feature.title}
                </Typography>

                <Typography sx={{ color: "#475569" }}>
                  {feature.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}