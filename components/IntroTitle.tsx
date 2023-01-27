import { Typography } from "@mui/material";
import { FC } from "react";

const IntroTitle: FC<{ content: string }> = ({ content }) => {
  return (
    <div style={{ position: "relative", background: "#1976D2", height: 300 }}>
      <div
        style={{
          position: "absolute",
          color: "white",
          top: "35%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Typography variant="h4" fontWeight="bolder" textAlign="center">
          {content}
        </Typography>
      </div>
      <div style={{ position: "absolute", left: 0, bottom: 0, right: 0 }}>
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(255,255,255,0.7"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#F6F7FB" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default IntroTitle;
