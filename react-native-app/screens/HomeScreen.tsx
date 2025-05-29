import { Screen } from "@/components/Screen";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export const HomeScreen = () => {
  const { t } = useTranslation();

  return (
    <Screen
      title={t("screens.HomeScreen.title")}
      description={t("screens.HomeScreen.description")}
    ></Screen>
  );
};
