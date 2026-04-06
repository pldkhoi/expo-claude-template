import { Pressable, Text, type PressableProps } from "react-native";

interface ButtonProps extends PressableProps {
  title: string;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export function Button({ title, variant = "primary", className = "", ...props }: ButtonProps) {
  const baseStyles = "rounded-lg py-3 px-6 items-center";
  const variantStyles = {
    primary: "bg-blue-600 active:bg-blue-700",
    secondary: "bg-gray-600 active:bg-gray-700",
    outline: "border border-blue-600 bg-transparent",
  };
  const textVariantStyles = {
    primary: "text-white font-semibold",
    secondary: "text-white font-semibold",
    outline: "text-blue-600 font-semibold",
  };

  return (
    <Pressable className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      <Text className={textVariantStyles[variant]}>{title}</Text>
    </Pressable>
  );
}
