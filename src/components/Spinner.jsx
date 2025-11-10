import React from 'react';

export default function Spinner({ size = 6, color = 'currentColor' }) {
  return (
    <div
      className="inline-block animate-spin rounded-full border-4 border-current border-r-transparent"
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
        borderColor: color,
      }}
      role="status"
      aria-label="Loading"
    />
  );
}
