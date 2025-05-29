import { Carton } from "@/hooks/useUPCStore/types";
import { CartonNavigatorParamList } from "@/navigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { Pressable } from "react-native";
import { Text } from "./ui/text";

type UPCContainerProps = Carton;

export const CartonCard = ({ id, UPCList }: UPCContainerProps) => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<CartonNavigatorParamList, "CartonListScreen">
    >();

  return (
    <Pressable
      className="p-4 border border-gray-300 rounded-lg"
      onPress={() => {
        navigation.navigate("CartonDetailScreen", { cartonId: id });
      }}
    >
      <Text className="text-lg font-semibold">
        {t("components.CartonCard.box_id", { id })}
      </Text>
      <Text className="text-sm font-medium">
        {t("components.CartonCard.total_quantity", {
          count: UPCList.reduce((sum, item) => sum + item.quantity, 0),
        })}
      </Text>
    </Pressable>
  );
};
