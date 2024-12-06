import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'rounded-xl bg-gray-800 p-6 shadow-lg ring-1 ring-gray-700',
        className
      )}
    >
      {children}
    </div>
  );
};