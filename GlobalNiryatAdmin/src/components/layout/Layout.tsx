import React from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer"; // Import Footer
import { Outlet } from "react-router-dom";

type LayoutProps = {
  children?: any;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <Header /> {/* The header will be displayed on all pages */}
      {/* Main content */}
      <Box sx={{ flexGrow: 1, padding: 2, mt: 6 }}>
        {/* Render the children passed to Layout or Outlet for nested routes */}
        {children || <Outlet />}
      </Box>
      {/* Footer */}
      {/* <Footer /> */}
    </Box>
  );
};

export default Layout;
