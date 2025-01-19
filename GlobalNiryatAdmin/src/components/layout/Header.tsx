import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  // Check if the user is logged in (based on the presence of the token in localStorage)
  const isLoggedIn = !!localStorage.getItem("authToken");

  const handleLogout = () => {
    // Clear the auth token from localStorage
    localStorage.removeItem("authToken");
    // Redirect to the login page
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "primary.main" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Title or Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Global Niryat
        </Typography>

        {/* Logout Button (visible only if logged in) */}
        {isLoggedIn && (
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              fontWeight: "bold",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
