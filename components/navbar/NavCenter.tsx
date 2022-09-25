import React, { FC } from "react";
import { Box, Button, Typography, MenuItem, Menu } from "@mui/material";
import HoverMenu from "material-ui-popup-state/HoverMenu";
import {
  usePopupState,
  bindHover,
  bindMenu,
} from "material-ui-popup-state/hooks";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const NavCenter: FC = () => {
  const pages = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Toeic Info",
      url: "/toeic_info",
    },
    {
      name: "Toeic Tips",
      url: "/toeic_tips",
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
    <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 2, margin: "0 auto" }}>
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
  );
};

export default NavCenter;
