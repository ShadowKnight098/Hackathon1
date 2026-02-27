import { Box, Typography, Button, Stack } from "@mui/material";

export default function Hero() {
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        borderRadius:"2rem",
        px: { xs: 3, md: 8 },
        padding:"2rem",
        margin:"2rem",
        background: "#F5F7FB",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={6}
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        {/* LEFT SIDE — TEXT */}
        <Box flex={1}>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#1e293b",
              lineHeight:"2",
              py:"2",
              

             }}
          >
            Digital Health Records for RMP Clinics
          </Typography>

          <Typography
            variant="h6"
            sx={{ color: "#475569", mb: 3, lineHeight: 1.6,
              fontSize:"1.5rem",
              fontWeight:"500"
             }}
          >
            Small clinics still rely on paper-based records which leads to
            lost patient history, inefficient appointment management, and
            delayed treatment. Our system digitizes patient records and
            appointments, enabling affordable healthcare management for
            Registered Medical Practitioners.
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#2563EB",
              px: 4,
              py: 1.5,
              fontWeight: 600,
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#1d4ed8",
              },
            }}
          >
            Get Started
          </Button>
        </Box>

        {/* RIGHT SIDE — IMAGE */}
        <Box flex={1} textAlign="center">
          <img
            src="/01.jpg"
            alt="Healthcare Illustration"
            style={{
              width: "100%",
              borderRadius:"5rem",
              maxWidth: "450px",
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
}