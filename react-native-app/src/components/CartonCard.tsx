import { Carton } from "@/types";
import { CartonNavigatorParamList } from "@/navigation";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { Text } from "./ui/text";
import { useCartonStore } from "@/store/useCartonStore";
import { Trash2 } from "lucide-react-native";

type UPCContainerProps = Carton;

export const CartonCard = ({ id, CartonList }: UPCContainerProps) => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<CartonNavigatorParamList, "CartonListScreen">
    >();
  const { removeCarton } = useCartonStore();

  return (
    <View className="p-4 border border-gray-300 rounded-lg flex-row justify-between items-center">
      <View className="flex-1 mr-2">
        <Pressable
          onPress={() => {
            navigation.navigate("CartonDetailScreen", { cartonId: id });
          }}
        >
          <Text className="text-lg font-semibold">
            {t("components.CartonCard.box_id", { id })}
          </Text>
          <Text className="text-sm font-medium">
            {t("components.CartonCard.total_quantity", {
              count: CartonList.reduce((sum, item) => sum + item.quantity, 0),
            })}
          </Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => removeCarton(id)}
        className="p-2 bg-red-500 rounded-md"
      >
        <Trash2 color="white" size={20} />
      </Pressable>
    </View>
  );
};
