import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import NavCenter from "./NavCenter";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useMemo } from "react";
import HomeIcon from "@mui/icons-material/Home";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import TranslateIcon from "@mui/icons-material/Translate";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PsychologyIcon from "@mui/icons-material/Psychology";
import BookIcon from "@mui/icons-material/Book";
import NavRight from "./NavRight";
const Navbar = () => {
  const router = useRouter();
  const [isShowing, setIsShowing] = useState(false);

  const pageList = useMemo(
    () => [
      { page: "Trang chủ", icon: <HomeIcon />, url: "/" },
      { page: "Giới thiệu về TOEIC", icon: <BookIcon />, url: "/toeic_info" },
      {
        page: "Mẹo thi TOEIC",
        icon: <TipsAndUpdatesIcon />,
        url: "/toeic_tips",
      },
      { page: "Ngữ pháp", icon: <TranslateIcon />, url: "/grammar" },
      { page: "Từ vựng", icon: <GTranslateIcon />, url: "/vocabulary" },
      { page: "Luyện tập", icon: <FitnessCenterIcon />, url: "/practice" },
      { page: "Thi thử", icon: <PsychologyIcon />, url: "/test" },
    ],
    []
  );

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {pageList.map((item, index) => (
          <ListItem key={item.url} disablePadding>
            <ListItemButton href={`${item.url}`}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.page} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <ToastContainer />
      <AppBar position="static" sx={{ background: "white" }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexGrow: 1,
              color: "black",
            }}
          >
            <Typography
              component="a"
              href="/"
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontFamily: "monospace",
                display: {
                  md: "block",
                  xs: "none",
                },
              }}
            >
              olaQuiz
            </Typography>
            <MenuIcon
              sx={{
                display: {
                  md: "none",
                  xs: "block",
                },
              }}
              onClick={() => setIsShowing((state) => !state)}
            />
            {!router.pathname.startsWith("/admin") && <NavCenter />}
            <NavRight />
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor={"left"}
        open={isShowing}
        onClose={() => setIsShowing(false)}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
        }}
      >
        {list()}
      </Drawer>
    </>
  );
};

export default Navbar;
