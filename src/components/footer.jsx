import { Box, Typography, Stack, Link, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        mt: 10,
        background: "#0f172a",
        color: "#ffffff",
        py: 6,
        px: { xs: 3, md: 8 },
      }}
    >
      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>
        
        {/* Top Section */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="space-between"
          alignItems={{ xs: "center", md: "flex-start" }}
        >
          {/* Left Content */}
          <Box textAlign={{ xs: "center", md: "left" }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{fontSize:"2.5rem"}}>
              🩺 MoonDev Clinic
            </Typography>

            <Typography sx={{ color: "#94a3b8", maxWidth: "300px", fontSize:"1.3rem"}}>
              A lightweight digital health record and appointment
              management system designed for small RMP clinics.
            </Typography>

            {/* Social Icons */}
            <Stack direction="row" spacing={1} mt={2} justifyContent={{ xs: "center", md: "flex-start" }}>
              <IconButton
                href="https://github.com/yourprofile"
                target="_blank"
                sx={{
                  color: "#94a3b8",

                  "&:hover": { color: "#ffffff" },
                }}
              >
                <GitHubIcon sx={{fontSize:"4rem"}} />
              </IconButton>

              <IconButton
                href="https://youtube.com/yourchannel"
                target="_blank"
                sx={{
                  color: "#94a3b8",
                  "&:hover": { color: "#ff0000" },
                }}
              >
                <YouTubeIcon  sx={{fontSize:"4rem"}} />
              </IconButton>

              <IconButton
                href="https://instagram.com/yourprofile"
                target="_blank"
                sx={{
                  color: "#94a3b8",
                  "&:hover": { color: "#E1306C" },
                }}
              >
                <InstagramIcon  sx={{fontSize:"4rem"}}/>
              </IconButton>
            </Stack>
          </Box>

          {/* Quick Links */}
          <Stack spacing={1} textAlign={{ xs: "center", md: "left" }}>
            <Typography fontWeight="bold">Quick Links</Typography>

            <Link href="/" underline="none" sx={{ color: "#94a3b8", "&:hover": { color: "#ffffff",  fontSize:"2rem", height:"2rem"} }}>
              Home
            </Link>

            <Link href="/form" underline="none" sx={{ color: "#94a3b8", "&:hover": { color: "#ffffff", fontSize:"2rem"} }}>
              Patient Form
            </Link>

            <Link href="/records" underline="none" sx={{ color: "#94a3b8", "&:hover": { color: "#ffffff", fontSize:"2rem"} }}>
              Records
            </Link>

            <Link href="/dashboard" underline="none" sx={{ color: "#94a3b8", "&:hover": { color: "#ffffff" ,fontSize:"2rem"} }}>
              Dashboard
            </Link>
          </Stack>
        </Stack>

        {/* Bottom */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            mt: 5,
            pt: 3,
            textAlign: "center",
          }}
        >
          <Typography sx={{ color: "#94a3b8" }}>
            © {new Date().getFullYear()} MoonDev Clinic. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}