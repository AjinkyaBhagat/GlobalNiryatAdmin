import React from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { login } from "../../api/auth"; // Import the API function
import { useAuth } from "../../hooks/useAuth"; // Import the auth hook
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  InputAdornment,
} from "@mui/material";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";

const AdminLoginForm: React.FC = () => {
  const { login: handleLogin } = useAuth();

  // Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const response = await login(values.email, values.password); // Simulated API call
      handleLogin(response.token); // Save token via useAuth
      window.location.replace("/dashboard"); // Navigate to dashboard
    } catch (error) {
      alert("Login failed. Please check your credentials." + error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4, boxShadow: 3 }}>
        <Typography variant="h4" align="center" sx={{ mb: 3 }}>
          Admin Login
        </Typography>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              {/* Email Field */}
              <Field
                as={TextField}
                name="email"
                label="Email Address"
                variant="outlined"
                fullWidth
                margin="normal"
                helperText={touched.email && errors.email}
                error={touched.email && Boolean(errors.email)}
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
                helperText={touched.password && errors.password}
                error={touched.password && Boolean(errors.password)}
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
                  mt: 3,
                  py: 1.5,
                  fontWeight: "bold",
                  fontSize: "1rem",
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
