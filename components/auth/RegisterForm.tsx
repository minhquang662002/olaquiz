import type { NextPage } from "next";
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import React from "react";
import { register } from "../../utils/api";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";

const validationSchema = yup.object({
  name: yup.string().required("Thiếu trường tên"),
  email: yup.string().email("Nhập mật khẩu").required("Thiếu trường email"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải dài ít nhất 8 ký tự")
    .required("Thiếu trường mật khẩu"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu phải khớp")
    .required("Cần xác nhận mật khẩu"),
});

const RegisterForm = () => {
  const { setIsLoading } = useContext(GlobalContext);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      setIsLoading(true);
      await register(values);
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
            id="name"
            name="name"
            label="Tên"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Mật khẩu"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          fullWidth
          id="confirm_password"
          name="confirm_password"
          label="Xác nhận mật khẩu"
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Đăng ký
        </Button>
      </form>

      <Typography
        sx={{ textAlign: "center" }}
        onClick={() => window.location.replace("/login")}
      >
        Đã có tài khoản? <span className="login__direct">Đăng nhập</span>
      </Typography>
    </Box>
  );
};

export default RegisterForm;
