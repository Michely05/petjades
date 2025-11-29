import React from "react";

type BaseButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

export const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  className = "",
  type="button"
}) => {
  const baseStyles =
    "px-6 py-3 rounded-lg font-medium transition-colors duration-300";

  const variants = {
    primary: "bg-[var(--primary-color)] hover:bg-[var(--secundary-color)] text-white cursor-pointer",
    secondary: "border border-[var(--primary-color)] text-[var(--primary-color)] font-semibold px-6 py-2 rounded-full hover:bg-[#e7f2e3] transition cursor-pointer",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
