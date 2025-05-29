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
    <View className={cn("flex-1 p-4 gap-4", className)} {...props}>
      {title && <Text className="text-2xl font-bold">{title}</Text>}
      {description && (
        <Text className="text-md text-muted-foreground">{description}</Text>
      )}
      <View>{children}</View>
    </View>
  );
};
