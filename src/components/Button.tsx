import React from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps {
  label: string;
  onClick: () => void;
  customClassName?: string;
}

export default function Button({
  customClassName,
  onClick,
  label,
}: Readonly<ButtonProps>) {
  return (
    <button
      className={twMerge(
        "h-10 w-36 p-2.5", 
        "rounded-xl text-xs text-foreground-button", 
        "bg-background-button border border-border-button cursor-pointer",
        "hover:scale-105 active:scale-95 transition-transform",
        customClassName
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
