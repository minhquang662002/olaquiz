import { FC } from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Box, Button, MenuItem, Menu } from "@mui/material";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
const NavRight: FC = () => {
  const session = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();
  return (
    <>
      {session.status != "loading" &&
        (session.status === "authenticated" ? (
          <>
            <Avatar
              onClick={handleMenu}
              src={session.data.user.avatar}
              sx={{
                marginLeft: `${
                  router.pathname.startsWith("/admin") ? "auto" : ""
                }`,
              }}
            />
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link href={`/account/${session.data.user.id}`}>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Link>
              <MenuItem
                onClick={() => {
                  handleClose();
                  signOut({
                    callbackUrl:
                      router.pathname.startsWith("/admin") ||
                      router.pathname.startsWith("/test") ||
                      router.pathname.startsWith("/study")
                        ? "/"
                        : window.location.pathname,
                  });
                }}
              >
                <LogoutIcon sx={{ fontSize: 20, marginRight: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Button
              variant="text"
              onClick={() => signIn()}
              sx={{
                color: "gray",
                fontFamily: "Montserrat, sans-serif",
                fontSize: 12,
              }}
            >
              Đăng nhập
            </Button>
            <Button className="register_btn" variant="contained" href="/login">
              Đăng kí
            </Button>
          </Box>
        ))}
    </>
  );
};

export default NavRight;
