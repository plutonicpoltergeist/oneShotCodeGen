import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Paper, Typography } from "@mui/material";
import Form from "@rjsf/mui";
import validator from "@rjsf/validator-ajv8";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../services/api";
const schema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string", format: "email", title: "Email" },
    password: { type: "string", title: "Password" },
  },
};
const uiSchema = { "ui:submitButtonOptions": { title: "Login" } };
export default function Login() {
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();
  const handleSubmit = async ({ formData }) => {
    try {
      const { user, token } = await login(formData);
      authLogin(user, token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          HR Onboarding System
        </Typography>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          validator={validator}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  );
}
