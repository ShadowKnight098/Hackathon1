import { Box, Typography, Grid, Stack } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function Impact() {
  return (
    <Box
      sx={{
        width: "100%",
        py: 12,
        background: "#2563EB",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* CENTER CONTAINER */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1200px",
          border: "1px solid #e2e8f0",
          borderRadius: "20px",
          background: "#b7c6e4d6",

          p: { xs: 3, md: 6 },
          boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        <Grid container spacing={6} alignItems="center" sx={{}}>
          {/* LEFT IMAGE */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="/02.jpg"
              alt="Healthcare Impact"
              sx={{
                width: "25rem",
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;",
                borderRadius: "14px",
                objectFit: "cover",
              }}
            />
          </Grid>

          {/* RIGHT CONTENT */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Empowering Small Clinics with Digital Healthcare
            </Typography>

            <Typography
              sx={{
                color: "#64748b",
                mb: 4,
                fontSize: "1.1rem",
                lineHeight: 1.7,
              }}
            >
              Our system replaces paper-based workflows with a simple digital
              platform, helping RMP clinics manage patients, appointments, and
              medical records efficiently.
            </Typography>

            <Stack spacing={2}>
              {[
                "Eliminates manual record keeping",
                "Faster patient consultations",
                "Secure medical history storage",
                "Affordable digital transformation",
              ].map((text, index) => (
                <Stack
                  key={index}
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  fontSize={"4rem"}
                >
                  <CheckCircleOutlineIcon sx={{ color: "#2563EB" }} />
                  <Typography
                    sx={{
                      fontSize: "1.3rem",
                      fontWeight: "500",
                    }}
                  >
                    {text}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
