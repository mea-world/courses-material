import { Text } from "@/components/ui/text";
import { FlatList } from "react-native";
import { useCartonStore } from "@/hooks/useCartonStore";
import { useTranslation } from "react-i18next";
import { Screen } from "@/components/Screen";
import { CartonCard } from "@/components/CartonCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react-native";

export const CartonListScreen = () => {
  const boxes = useCartonStore((state) => state.boxes);
  const addCarton = useCartonStore((state) => state.addCarton);
  const { t } = useTranslation();

  return (
    <Screen
      title={t("screens.CartonListScreen.title")}
      description={t("screens.CartonListScreen.description")}
    >
      <Button onPress={addCarton} className="flex-row gap-2">
        <Plus size={18} color="white" />
        <Text>{t("screens.CartonListScreen.addCarton")}</Text>
      </Button>
      <FlatList
        data={boxes}
        keyExtractor={(item) => item.id}
        contentContainerClassName="gap-4 mt-4"
        renderItem={({ item }) => <CartonCard {...item} />}
      />
    </Screen>
  );
};
