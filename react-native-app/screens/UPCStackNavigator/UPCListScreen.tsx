import { Text } from "@/components/ui/text";
import { useNavigation } from "@react-navigation/native";
import { FlatList, View } from "react-native";
import { useUPCStore } from "@/hooks/useUPCStore";
import { useTranslation } from "react-i18next";
import { Screen } from "@/components/Screen";
import { UPCContainerCard } from "@/components/UPCContainerCard";

export const UPCListScreen = () => {
  const navigation = useNavigation();
  const boxes = useUPCStore((state) => state.boxes);
  const { t } = useTranslation();

  return (
    <Screen
      title={t("screens.UPCListScreen.title")}
      description={t("screens.UPCListScreen.description")}
    >
      <View className="gap-4">
        <FlatList
          data={boxes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <UPCContainerCard {...item} />}
        />
      </View>
    </Screen>
  );
};
