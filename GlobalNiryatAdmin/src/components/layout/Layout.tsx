import React from "react";
import { Box } from "@mui/material";
import Header from "./Header"; // Updated Header with Logout
import { Outlet } from "react-router-dom";

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <Header /> {/* Header with conditional Logout functionality */}
      {/* Main content */}
      <Box sx={{ flexGrow: 1, padding: 2, marginTop: "64px" }}>
        {/* Render children or Outlet for nested routes */}
        {children || <Outlet />}
      </Box>
    </Box>
  );
};

export default Layout;
