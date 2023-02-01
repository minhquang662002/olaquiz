import {
  Paper,
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import { FC, Fragment, memo } from "react";
import { Result, User } from "@prisma/client";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

interface Props {
  ranking: (Result & User)[];
}

const Leaderboard: FC<Props> = ({ ranking }) => {
  return (
    <Paper sx={{ marginTop: 2 }}>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Bảng xếp hạng
      </Typography>
      <Divider />
      <List disablePadding>
        {ranking.map((item, index) => (
          <Fragment key={item.id}>
            <ListItem
              sx={{
                borderRadius: 2,
                gap: 1,
              }}
            >
              {index == 0 || index == 1 || index == 2 ? (
                <WorkspacePremiumIcon
                  sx={{
                    color:
                      index == 0
                        ? "#FFD700"
                        : index == 1
                        ? "#C0C0C0"
                        : index == 2
                        ? "#b87333"
                        : "",
                  }}
                />
              ) : (
                <Typography sx={{ padding: 1 }}>{index + 1}</Typography>
              )}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 1,
                }}
              >
                <ListItemAvatar>
                  <Avatar src={item.avatar} />
                </ListItemAvatar>
                <ListItemText sx={{ fontWeight: "bolder" }}>
                  {item?.name}
                </ListItemText>
              </Box>
              <Box
                sx={{
                  marginLeft: "auto",
                  width: 40,
                  textAlign: "center",
                  border:
                    index == 0
                      ? "2px solid #A38A00"
                      : index == 1
                      ? "2px solid #C0C0C0"
                      : index == 2
                      ? "2px solid #815924"
                      : "2px solid #F4F2F5",
                  borderRadius: 1,
                  background:
                    index == 0
                      ? "#FFD700"
                      : index == 1
                      ? "#929292"
                      : index == 2
                      ? "#b87333"
                      : "#F8EFCE",
                  color: index == 0 || index == 1 || index == 2 ? "white" : "",
                  fontWeight: "bolder",
                }}
              >
                {item.score}
              </Box>
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default memo(Leaderboard);
