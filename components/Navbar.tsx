import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  Box,
  Button,
  MenuItem,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import type { NextPage } from "next";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import {
  usePopupState,
  bindHover,
  bindMenu,
} from "material-ui-popup-state/hooks";

const Navbar: NextPage = () => {
  const pages = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Toeic Info",
      url: "/toeic-info",
    },
    {
      name: "Toeic Tips",
      url: "/toeic-tips",
    },
    {
      name: "Grammar",
      url: "/grammar",
    },
  ];
  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoPopover",
  });

  const popupState2 = usePopupState({
    variant: "popover",
    popupId: "demoPopover",
  });

  const subTest = [
    {
      name: "Listening",
      url: "/listening",
    },
    {
      name: "Reading",
      url: "/reading",
    },
    {
      name: "Full test",
      url: "/exam",
    },
  ];

  const subVocab = [
    {
      name: "600 vocabulary",
      url: "/vocabulary/600-vocabs",
    },
    {
      name: "3000 most common words in English",
      url: "/vocabulary/3000-commons",
    },
  ];

  return (
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
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            olaQuiz
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            {pages.map((item) => (
              <Button
                href={item.url}
                key={item.name}
                sx={{
                  fontSize: 15,
                  fontFamily: "Montserrat, sans-serif",
                  color: "black",
                }}
              >
                {item.name}
              </Button>
            ))}

            <>
              <Button
                {...bindHover(popupState)}
                href="/vocabulary"
                sx={{
                  fontSize: 15,
                  fontFamily: "Montserrat, sans-serif",
                  color: "black",
                }}
              >
                Vocabulary
                <KeyboardArrowDownIcon />
              </Button>
              <HoverMenu
                {...bindMenu(popupState)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                {subVocab.map((item) => (
                  <MenuItem
                    component="a"
                    href={item.url}
                    key={item.name}
                    onClick={popupState.close}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </HoverMenu>
            </>

            <>
              <Button
                {...bindHover(popupState2)}
                href="/vocabulary"
                sx={{
                  fontSize: 15,
                  fontFamily: "Montserrat, sans-serif",
                  color: "black",
                }}
              >
                Test Online
                <KeyboardArrowDownIcon />
              </Button>
              <HoverMenu
                {...bindMenu(popupState2)}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                {subTest.map((item) => (
                  <MenuItem
                    key={item.name}
                    onClick={popupState2.close}
                    href={item.url}
                    component="a"
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </HoverMenu>
            </>
          </Box>

          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Button
              variant="text"
              href="/login"
              sx={{
                color: "gray",
                fontFamily: "Montserrat, sans-serif",
                fontSize: 12,
              }}
            >
              Sign in
            </Button>
            <Button
              className="register_btn"
              variant="contained"
              href="/register"
            >
              SIGN UP
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
