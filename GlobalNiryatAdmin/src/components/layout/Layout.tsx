import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Layout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Box sx={{ flexGrow: 1, padding: 2, mt: 6 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
