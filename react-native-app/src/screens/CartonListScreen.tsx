import { Text } from "@/components/ui/text";
import { useNavigation } from "@react-navigation/native";
import { FlatList, View } from "react-native";
import { useUPCStore } from "@/hooks/useUPCStore";
import { useTranslation } from "react-i18next";
import { Screen } from "@/components/Screen";
import { CartonCard } from "@/components/CartonCard";

export const CartonListScreen = () => {
  const navigation = useNavigation();
  const boxes = useUPCStore((state) => state.boxes);
  const { t } = useTranslation();

  return (
    <Screen
      title={t("screens.CartonListScreen.title")}
      description={t("screens.CartonListScreen.description")}
    >
      <View className="gap-4">
        <FlatList
          data={boxes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CartonCard {...item} />}
        />
      </View>
    </Screen>
  );
};
