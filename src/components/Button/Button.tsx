import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  color: "black" | "white";
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  color,
  className,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={`rounded-full px-8 py-5 text-base font-medium leading-normal tracking-[.1rem] ${
        color === "black" ? "bg-ink text-washi" : "bg-washi text-ink"
      } ${className && className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
