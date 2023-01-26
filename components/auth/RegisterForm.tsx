import type { NextPage } from "next";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { register } from "../../utils/api";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const validationSchema = yup.object({
  firstName: yup.string().required("This field is required"),
  lastName: yup.string().required("This field is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Require confirmation"),
});

const RegisterForm: NextPage<{
  setIsHavingAccount: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsHavingAccount }) => {
  const { setIsLoading } = useContext(GlobalContext);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,

    onSubmit: (values) => {
      setIsLoading(true);
      register(values);
      setIsLoading(false);
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "white",
        width: { xs: "100%", lg: 500 },
        borderRadius: 2,
        padding: 2,
        gap: 2,
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold" }}>
        ĐĂNG KÝ
      </Typography>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 20 }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          <TextField
            sx={{ flexGrow: 1 }}
            id="firstName"
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <TextField
            sx={{ flexGrow: 1 }}
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </div>
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

        <TextField
          fullWidth
          id="confirm_password"
          name="confirm_password"
          label="Confirm password"
          type="password"
          value={formik.values.confirm_password}
          onChange={formik.handleChange}
          error={
            formik.touched.confirm_password &&
            Boolean(formik.errors.confirm_password)
          }
          helperText={
            formik.touched.confirm_password && formik.errors.confirm_password
          }
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Sign up
        </Button>
      </form>

      <Typography
        sx={{ textAlign: "center" }}
        onClick={() => setIsHavingAccount(true)}
      >
        Already have account? <span className="login__direct">Sign in</span>
      </Typography>
    </Box>
  );
};

export default RegisterForm;
