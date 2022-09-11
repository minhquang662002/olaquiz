import type { NextPage } from "next";
import { Box, Button, Typography, TextField, Link } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const LoginForm: NextPage = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "rgb(227, 230, 233)",
        width: 500,
        borderRadius: 2,
        padding: 2,
        gap: 2,
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        SIGN IN
      </Typography>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 20 }}
      >
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Sign in
        </Button>
      </form>
      <Link href="/forgot_password" sx={{ textAlign: "center" }}>
        Forgot password?
      </Link>
      <Link href="/register" sx={{ textAlign: "center" }}>
        Dont have an account? Sign Up
      </Link>
    </Box>
  );
};

export default LoginForm;
