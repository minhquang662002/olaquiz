import { useRouter } from "next/router";
import { useMemo, Fragment, useState } from "react";
import TopicIcon from "@mui/icons-material/Topic";
import { Collapse } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PeopleIcon from "@mui/icons-material/People";
import TranslateIcon from "@mui/icons-material/Translate";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QuizIcon from "@mui/icons-material/Quiz";
import {
  Drawer,
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

const AdminDrawer = () => {
  const itemsList = useMemo(() => {
    return [
      {
        text: "Quản lý người dùng",
        icon: <PeopleIcon />,
        to: "/admin/user",
      },
      {
        text: "Quản lý bài viết",
        icon: <PostAddIcon />,
        to: "/admin/post",
      },
      {
        text: "Quản lý từ vựng",
        icon: <TranslateIcon />,
        to: "/admin/vocabulary",
      },
      {
        text: "Quản lý bài luyện tập",
        icon: <TranslateIcon />,
        to: "/admin/practice",
        children: [
          {
            icon: <TopicIcon />,
            text: "Chủ đề luyện tập",
            to: "/admin/practice/topic",
          },
          {
            icon: <QuizIcon />,
            text: "Bài luyện tập",
            to: "/admin/practice/exercise",
          },
        ],
      },
      {
        text: "Quản lý bài thi",
        icon: <TranslateIcon />,
        to: "/admin/test",
      },
    ];
  }, []);
  const router = useRouter();

  const SingleLevel = ({ item }: any) => {
    return (
      <ListItemButton
        selected={item.to === router.asPath}
        onClick={() => router.push(item.to)}
      >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
        {item.children && <span>have</span>}
      </ListItemButton>
    );
  };

  const MultiLevel = ({ item }: any) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen((prev) => !prev);
    };

    return (
      <Fragment>
        <ListItemButton
          selected={item.to === router.asPath}
          onClick={handleClick}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText sx={{ whiteSpace: "nowrap" }} primary={item.text} />
          {item.children && (
            <ExpandMoreIcon sx={{ transform: open ? "rotate(180deg)" : "" }} />
          )}
        </ListItemButton>
        {item.children && (
          <Collapse in={open}>
            {item.children?.map((child: any) => (
              <div key={child.to} style={{ marginLeft: 2 }}>
                <SingleLevel item={child} />
              </div>
            ))}
          </Collapse>
        )}
      </Fragment>
    );
  };

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
          <Fragment key={item.to}>
            {item.children ? (
              <MultiLevel item={item} />
            ) : (
              <SingleLevel item={item} />
            )}
          </Fragment>
        ))}
      </Box>
    </Drawer>
  );
};

export default AdminDrawer;
