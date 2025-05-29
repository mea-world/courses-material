import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";
import { Text } from "./ui/text";

type ScreenProps = PropsWithChildren<
  {
    title?: string;
    description?: string;
  } & ViewProps
>;

export const Screen = ({
  children,
  title,
  description,
  className,
  ...props
}: ScreenProps) => {
  return (
    <View className={cn("flex-1 p-4", className)} {...props}>
      <Text className="text-2xl font-bold mb-4">{title}</Text>
      <Text className="text-md text-muted-foreground mb-4">{description}</Text>
      {children}
    </View>
  );
};
