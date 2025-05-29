import { Screen } from "@/components/Screen";
import { Text } from "@/components/ui/text";
import { CartonNavigatorProps } from "@/navigation";
import { View, FlatList, Pressable } from "react-native";
import { useCartonStore } from "@/store/useCartonStore";
import { useTranslation } from "react-i18next";
import {
  PlusCircle,
  MinusCircle,
  Trash2,
  Send,
  Plus,
} from "lucide-react-native";
import React from "react";
import { Input } from "@/components/ui/input";

export interface CartonDetailScreenProps {
  cartonId: string;
}

export const CartonDetailScreen = ({
  route,
}: CartonNavigatorProps<"CartonDetailScreen">) => {
  const { cartonId } = route.params;
  const { t } = useTranslation();
  const [newUpc, setNewUpc] = React.useState("");

  const { boxes, updateUPCQuantity, removeUPCFromBox, addUPCToBox } =
    useCartonStore();

  const carton = boxes.find((box) => box.id === cartonId);

  const handleAddUPC = () => {
    if (newUpc.trim() === "") return;
    const upcExists = carton?.CartonList.some(
      (upc) => upc.key === newUpc.trim()
    );
    if (upcExists) {
      console.log("UPC already exists in this carton.");
      setNewUpc("");
      return;
    }
    addUPCToBox({
      boxId: cartonId,
      UPC: { key: newUpc.trim(), quantity: 1 },
    });
    setNewUpc("");
  };

  if (!carton) {
    return (
      <Screen>
        <Text>{t("screens.CartonDetailScreen.notFound")}</Text>
      </Screen>
    );
  }

  return (
    <Screen title={t("screens.CartonDetailScreen.title", { cartonId })}>
      <View className="flex-row items-center gap-3">
        <Input
          className="flex-1"
          placeholder={t("screens.CartonDetailScreen.addUPCPlaceholder")}
          value={newUpc}
          onChangeText={setNewUpc}
          onSubmitEditing={handleAddUPC}
          returnKeyType="done"
        />
        <Pressable
          onPress={handleAddUPC}
          className="p-2 bg-blue-500 rounded-md items-center justify-center"
          disabled={newUpc.trim() === ""}
        >
          <Plus size={24} color="white" />
        </Pressable>
      </View>

      <FlatList
        data={carton.CartonList}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between p-4 my-2 border border-gray-300 rounded-lg">
            <Text className="text-lg">{item.key}</Text>
            <View className="flex-row items-center gap-2">
              <Pressable
                onPress={() =>
                  updateUPCQuantity({
                    boxId: cartonId,
                    UPCKey: item.key,
                    quantity: item.quantity - 1,
                  })
                }
                disabled={item.quantity <= 0}
                className={`p-2 rounded-md ${
                  item.quantity <= 0 ? "bg-gray-300" : "bg-red-500"
                }`}
              >
                <MinusCircle size={20} color="white" />
              </Pressable>
              <Text className="text-lg text-center min-w-5">
                {item.quantity}
              </Text>
              <Pressable
                onPress={() =>
                  updateUPCQuantity({
                    boxId: cartonId,
                    UPCKey: item.key,
                    quantity: item.quantity + 1,
                  })
                }
                className="p-2 bg-green-500 rounded-md"
              >
                <PlusCircle size={20} color="white" />
              </Pressable>
              <Pressable
                onPress={() =>
                  removeUPCFromBox({ boxId: cartonId, UPCKey: item.key })
                }
                className="p-2 ml-4 bg-red-500 rounded-md"
              >
                <Trash2 size={20} color="white" />
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center mt-4">
            {t("screens.CartonDetailScreen.noUPCs")}
          </Text>
        }
      />
    </Screen>
  );
};
