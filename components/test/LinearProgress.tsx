import { Box, Typography, LinearProgress } from "@mui/material";
import { LinearProgressProps } from "@mui/material/LinearProgress";

const TestProgress = (
  props: LinearProgressProps & { value: number; total: number }
) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={(props.value / props.total) * 100}
          sx={{ height: 10, borderRadius: 999 }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          color="text.secondary"
          sx={{
            whiteSpace: "nowrap",
            fontSize: 10,
            fontWeight: 900,
            color: "black",
          }}
        >{`${Math.round(props.value)} / ${props.total}`}</Typography>
      </Box>
    </Box>
  );
};

export default TestProgress;
