import { FC, ReactNode } from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

export type ButtonProps = TouchableOpacityProps & {
  label?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  textClassName?: string;
  children?: ReactNode;
};

export const Button: FC<ButtonProps> = ({
  label,
  children,
  onPress,
  variant = "primary",
  size = "md",
  className = "",
  textClassName = "",
  ...rest
}) => {
  const baseStyle = "rounded-md items-center justify-center";

  const variantStyles = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
    outline: "border border-blue-500 bg-transparent",
    ghost: "bg-transparent",
  };

  const sizeStyles = {
    sm: "px-2 py-1",
    md: "px-4 py-2",
    lg: "px-6 py-3",
  };

  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <TouchableOpacity
      className={`${baseStyle} ${variantStyle} ${sizeStyle} ${className}`}
      onPress={onPress}
      activeOpacity={0.7}
      {...rest}
    >
      {children || (
        <Text
          className={`font-semibold ${
            variant === "outline" ? "text-blue-500" : "text-white"
          } ${textClassName}`}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
