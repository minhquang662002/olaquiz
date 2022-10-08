import { CircularProgress } from "@mui/material";

const LoadingLayout = () => {
  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "black",
          opacity: 0.4,
        }}
      ></div>
      <CircularProgress
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      />
    </div>
  );
};

export default LoadingLayout;
