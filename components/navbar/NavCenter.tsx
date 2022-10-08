import React, { useMemo, FC } from "react";
import { Box, Button, MenuItem } from "@mui/material";
const NavCenter: FC = () => {
  const PAGES = useMemo(
    () => [
      {
        name: "Trang chủ",
        url: "/",
      },
      {
        name: "Giới thiệu về TOEIC",
        url: "/toeic_info",
      },
      {
        name: "Mẹo thi TOEIC",
        url: "/toeic_tips",
      },
      {
        name: "Ngữ pháp",
        url: "/grammar",
      },
      {
        name: "Từ vựng",
        url: "/vocabulary",
      },
      {
        name: "Bài tập",
        url: "/exam",
      },
      {
        name: "Thi thử",
        url: "/exam",
      },
    ],
    []
  );

  return (
    <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 2, margin: "0 auto" }}>
      {PAGES.map((item) => (
        <Button
          href={item.url}
          key={item.name}
          sx={{
            fontSize: 13,
            fontFamily: "Montserrat, sans-serif",
            color: "black",
          }}
        >
          {item.name}
        </Button>
      ))}
    </Box>
  );
};

export default NavCenter;
