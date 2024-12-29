import React from "react";
import { Box, Typography, Container, Stack } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "#1976d2", padding: "16px 0", mt: "auto" }}>
      <Container maxWidth="lg">
        <Stack direction="row" spacing={3} justifyContent="space-between">
          <Stack spacing={1} width="40%">
            <Typography variant="body2" color="white">
              About Us
            </Typography>
            <Typography variant="body2" color="white">
              We are a global leader in providing export-import services.
            </Typography>
          </Stack>
          <Stack spacing={1} width="40%">
            <Typography variant="body2" color="white">
              Contact
            </Typography>
            <Typography variant="body2" color="white">
              Email: airseaexim@gmail.com
            </Typography>
            <Typography variant="body2" color="white">
              Phone: +91 7719899869
            </Typography>
          </Stack>
        </Stack>
      </Container>
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Typography variant="body2" color="white">
          © {new Date().getFullYear()} AIR SEA EXIM. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
