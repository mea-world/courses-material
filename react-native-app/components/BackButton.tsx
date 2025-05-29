import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { Text } from "./ui/text";
import { ArrowLeft } from "lucide-react-native";

export const BackButton = () => {
  const navigation = useNavigation();

  if (!navigation.canGoBack()) {
    return null;
  }

  return (
    <Pressable className="ml-3" onPress={() => navigation.goBack()}>
      <ArrowLeft size={24} />
    </Pressable>
  );
};
