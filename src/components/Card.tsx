
import React from "react";
import { twMerge } from "tailwind-merge";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly children: React.ReactNode;
  readonly className?: string;
}
export default function Card({
  children,
  className = "",
}: CardProps) {
  const baseStyles = "rounded-xl bg-background-card backdrop-blur-[2px] backdrop-opacity-5 shadow-lg p-6 w-full h-auto";
  return (
    <div
      className={twMerge(baseStyles, className)}
    >
      {children}
    </div>
  );
}
