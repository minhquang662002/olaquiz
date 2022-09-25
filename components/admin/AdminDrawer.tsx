import PostAddIcon from "@mui/icons-material/PostAdd";
import CategoryIcon from "@mui/icons-material/Category";
import PeopleIcon from "@mui/icons-material/People";
import TranslateIcon from "@mui/icons-material/Translate";

import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

const AdminDrawer = () => {
  const itemsList = [
    {
      text: "User",
      icon: <PeopleIcon />,
      to: "/admin/user",
    },
    {
      text: "Post",
      icon: <PostAddIcon />,
      to: "/admin/post",
    },
    {
      text: "Vocabulary",
      icon: <TranslateIcon />,
      to: "/admin/vocabulary",
    },
    {
      text: "Category",
      icon: <CategoryIcon />,
      to: "/admin/category",
    },
  ];
  const router = useRouter();

  return (
    <Drawer
      sx={{ width: "20%", background: "blue" }}
      PaperProps={{ sx: { width: "20%" } }}
      open={true}
      anchor="left"
      variant="persistent"
    >
      <Box p={2}>
        <Typography variant="h6">olaAdmin</Typography>
        {itemsList.map((item) => (
          <ListItemButton
            key={item.to}
            selected={item.to === router.pathname}
            onClick={() => router.push(item.to)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </Box>
    </Drawer>
  );
};

export default AdminDrawer;
