import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";

const validationSchema = yup.object({
  email: yup.string().email("Nhập email").required("Thiếu trường email"),
  password: yup.string().required("Thiếu trường mật khẩu"),
});

const LoginForm = () => {
  const { setIsLoading } = useContext(GlobalContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const res = await signIn("credentials", { ...values, redirect: false });
      if (res?.error) {
        toast.error(res.error);
        setIsLoading(false);
      }
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
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        ĐĂNG NHẬP
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
          placeholder="tester@gmail.com"
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
          placeholder="Mật khẩu"
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
        <Button color="primary" variant="contained" fullWidth type="submit">
          Đăng nhập
        </Button>
      </form>
      <Typography sx={{ textAlign: "center" }}>
        Chưa có tài khoản?{" "}
        <span
          className="register__direct"
          onClick={() => window.location.replace("/register")}
        >
          Đăng ký
        </span>
      </Typography>
    </Box>
  );
};

export default LoginForm;
