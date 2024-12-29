import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  InputAdornment,
  Alert,
} from "@mui/material";
import { LockOutlined, EmailOutlined } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // React Router for navigation

// Yup validation schema for the form
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const AdminLoginForm: React.FC = () => {
  const navigate = useNavigate(); // React Router navigate hook for redirection
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  // Initial values for Formik
  const initialValues = {
    email: "",
    password: "",
  };

  // Handle form submission
  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      // Make API call to Node.js backend for login
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: values.email,
          password: values.password,
        }
      );

      if (response.status === 200) {
        // Store token in localStorage or sessionStorage
        localStorage.setItem("authToken", response.data.token);

        // Navigate to the dashboard on successful login
        alert("Login successful!");
        navigate("/dashboard"); // Navigate to the dashboard page
      }
    } catch (error: any) {
      // Handle errors (e.g., invalid credentials, server errors)
      setErrorMessage("Invalid login credentials. Please try again.");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        marginTop: "20px",
      }}
    >
      <Paper
        sx={{
          padding: 3,
          width: "100%",
          maxWidth: 400,
          display: "flex",
          flexDirection: "column",
          gap: 3,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h1" align="center" sx={{ mb: 3 }}>
          Admin Login
        </Typography>

        {/* Display error message if login fails */}
        {errorMessage && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {errorMessage}
          </Alert>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, handleChange, values }) => (
            <Form>
              {/* Email Field */}
              <Field
                as={TextField}
                name="email"
                label="Email Address"
                variant="outlined"
                fullWidth
                autoFocus
                margin="normal"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlined />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Password Field */}
              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  padding: "10px 0",
                  marginTop: 3,
                  fontSize: "1.1rem",
                  boxShadow: 3,
                  "&:hover": {
                    backgroundColor: "#1976d2",
                    boxShadow: 6,
                  },
                }}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default AdminLoginForm;
