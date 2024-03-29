import React, { useMemo, FC } from "react";
import { Box, Button } from "@mui/material";
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
        name: "Luyện tập",
        url: "/practice",
      },
      {
        name: "Thi thử",
        url: "/test",
      },
    ],
    []
  );

  return (
    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2, margin: "0 auto" }}>
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
