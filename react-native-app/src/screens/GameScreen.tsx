import { Screen } from "@/components/Screen";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export const GameScreen = () => {
  const { t } = useTranslation();

  return (
    <Screen
      title={t("screens.GameScreen.title")}
      description={t("screens.GameScreen.description")}
    ></Screen>
  );
};
