import { User } from "@prisma/client";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { prisma } from "../../utils/db";
import { FC } from "react";
import {
  Container,
  Box,
  Avatar,
  Typography,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { GlobalContext } from "../../components/context/GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";
import ResultTable from "../../components/user/ResultTable";

interface Props {
  user: User;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AccountPage: FC<Props> = ({ user }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { setIsLoading } = useContext(GlobalContext);
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Không đúng email")
      .required("Thiếu trường email"),
    name: yup.string().required("Thiếu trường tên"),
    phone: yup.number().typeError("Số điện thoại phải là số"),
    dateBirth: yup.date().typeError("Không đúng định dạng"),
  });

  const formik = useFormik({
    initialValues: {
      email: `${user?.email ? user.email : ""}`,
      name: `${user?.name ? user.name : ""}`,
      phone: `${user?.phoneNumber ? user.phoneNumber : ""}`,
      dateBirth: `${user?.birthDay ? dayjs(user.birthDay) : ""}`,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const res = await axios.patch("/api/user", values);
        toast.success(res.data);
      } catch (error) {
        //@ts-ignore
        toast.error(error?.response?.data);
        setIsLoading(false);
      }
      setIsLoading(false);
    },
  });

  return (
    <>
      <Head>
        <title>Tài khoản</title>
      </Head>
      <Typography
        variant="h4"
        fontWeight="bolder"
        sx={{ marginX: "auto", marginTop: 5 }}
      >
        Tài khoản
      </Typography>
      <Container
        sx={{
          background: "white",
          marginY: 5,
          padding: {
            md: 5,
          },
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          gap: 10,
        }}
        maxWidth="lg"
      >
        <Box sx={{ textAlign: "center" }}>
          <Avatar
            sx={{ marginX: "auto", width: 150, height: 150 }}
            src={`${user?.avatar}`}
          />
          <Typography variant="h5" sx={{ fontWeight: "bolder", marginTop: 2 }}>
            {user?.name}
          </Typography>
          <Typography>{user?.email}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label="Thông tin cá nhân"
              id={`simple-tab-0`}
              aria-controls={`simple-tabpanel-0`}
            />
            <Tab
              label="Lịch sử"
              id={`simple-tab-1`}
              aria-controls={`simple-tabpanel-1`}
            />
          </Tabs>
          <TabPanel value={value} index={0}>
            <form
              onSubmit={formik.handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                }}
              >
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Họ và tên"
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
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
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
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 2,
                }}
              >
                <DesktopDatePicker
                  inputFormat="DD/MM/YYYY"
                  value={formik.values.dateBirth}
                  onChange={(value) =>
                    formik.setFieldValue("dateBirth", value, true)
                  }
                  renderInput={(params) => (
                    <TextField {...params} fullWidth label="Ngày sinh" />
                  )}
                />
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Số điện thoại"
                  type="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalPhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Button
                sx={{ display: "inline-block", marginLeft: "auto" }}
                type="submit"
              >
                Cập nhật
              </Button>
            </form>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ResultTable />
          </TabPanel>
        </Box>
      </Container>
    </>
  );
};

export default AccountPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const userId = ctx.params?.userId as string;
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      avatar: true,
      email: true,
      birthDay: true,
      phoneNumber: true,
    },
  });

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};
