import React from "react";
import { MouseEvent, ReactNode } from "react";

type tailwindClass = string | undefined;
interface AlertProps {
  className?: string;
  children?: string | JSX.Element | ReactNode;
  height?: tailwindClass;
  onClick?: (evt: MouseEvent<HTMLButtonElement>) => void;
}

export default function Alert(props: AlertProps) {
  const { children, className = "" } = props;

  return (
    <div
      className={`mt-8 flex h-[60px] items-center justify-center rounded-full bg-error text-center ${className} px-4`}
    >
      {children && typeof children === "string" ? (
        <p className="text-sm font-medium uppercase leading-[120%] tracking-[1.4px] text-ink">
          {children}
        </p>
      ) : (
        ""
      )}
    </div>
  );
}
