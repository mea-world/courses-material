import { Screen } from "@/components/Screen";
import { Text } from "@/components/ui/text";
import { CartonNavigatorProps } from "@/navigation";
import { View } from "react-native";

export interface CartonDetailScreenProps {
  cartonId: string;
}

export const CartonDetailScreen = ({
  route,
}: CartonNavigatorProps<"CartonDetailScreen">) => {
  const { cartonId } = route.params;
  return (
    <Screen>
      <Text>UPC Detail {cartonId}</Text>
    </Screen>
  );
};
