import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { Text } from "./ui/text";

export const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Text>Back</Text>
    </Pressable>
  );
};
