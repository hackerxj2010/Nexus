import React from "react";

export const ClaudeLogo = ({
  size = 20,
  color = "#da7756",
}: {
  size?: number;
  color?: string;
}) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill={color}>
    <path d="M16 2.5L17.9 9.6 24.4 6.1 20.8 12.5 28 13.9 21.7 17.1 24.4 23.9 17.9 20.6 16 27.5 14.1 20.6 7.6 23.9 10.3 17.1 4 13.9 11.2 12.5 7.6 6.1 14.1 9.6Z" />
  </svg>
);
