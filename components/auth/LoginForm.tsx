import type { NextPage } from "next";
import { Box, Button, Typography, TextField, Link } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

const LoginForm: NextPage<{
  setIsHavingAccount: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsHavingAccount }) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const res = await signIn("credentials", { ...values, redirect: false });
      if (res?.error) {
        toast.error(res.error);
      }
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
      <Typography sx={{ textAlign: "center" }}>
        Don&apos;t have an account?{" "}
        <span
          className="register__direct"
          onClick={() => setIsHavingAccount(false)}
        >
          Sign up
        </span>
      </Typography>
    </Box>
  );
};

export default LoginForm;
