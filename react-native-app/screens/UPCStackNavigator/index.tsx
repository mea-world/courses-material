import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { UPCListScreen } from "./UPCListScreen";
import { UPCDetailScreen } from "./UPCDetailScreen";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export const UPCStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UPCList" component={UPCListScreen} />
      <Stack.Screen name="UPCDetail" component={UPCDetailScreen} />
    </Stack.Navigator>
  );
};
