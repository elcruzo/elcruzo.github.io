import React from "react";

export const createLine = (startY, endX) => (
    <path
      d={`M${endX}, ${startY}H300`}
      key={`line${startY}`}
      stroke="#635BE6"
      strokeWidth="4"
      strokeDasharray="8 8"
    />
);

export const createPath = (startY, midY, endX) => (
    <path
      d={`M${endX} ${midY}H150v50`}
      key={`path${startY}`}
      stroke="#635BE6"
      strokeWidth="4"
      strokeDasharray="8 8"
    />
);