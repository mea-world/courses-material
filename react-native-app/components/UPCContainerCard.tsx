import { UPCContainer } from "@/hooks/useUPCStore/types";
import { Pressable, View } from "react-native";
import { Text } from "./ui/text";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

type UPCContainerProps = UPCContainer;

export const UPCContainerCard = ({ id, UPCList }: UPCContainerProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <Pressable
      className="p-4 border border-gray-300 rounded-lg"
      onPress={() => {
        navigation.navigate("UPCDetail", { id });
      }}
    >
      <Text className="text-lg font-semibold">
        {t("components.UPCContainerCard.box_id", { id })}
      </Text>
      <Text className="text-sm font-medium">
        {t("components.UPCContainerCard.total_quantity", {
          count: UPCList.reduce((sum, item) => sum + item.quantity, 0),
        })}
      </Text>
    </Pressable>
  );
};
