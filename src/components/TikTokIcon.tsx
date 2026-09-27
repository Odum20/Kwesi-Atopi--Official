import React from 'react';

interface TikTokIconProps {
  className?: string;
}

export const TikTokIcon: React.FC<TikTokIconProps> = ({ className = 'w-5 h-5' }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-.88-.06A6.34 6.34 0 0 0 3.14 15.7a6.34 6.34 0 0 0 10.82 4.47V12.9a8.27 8.27 0 0 0 5.63 2.23V11.7a4.84 4.84 0 0 1-3.4-1.24 4.8 4.8 0 0 1-1.6-3.77z" />
    </svg>
  );
};
