import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { CartonNavigatorParamList, TabParamList } from ".";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BackButton } from "@/components/BackButton";
import { View } from "react-native";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { GameScreen } from "@/screens/GameScreen";
import { Home, Package } from "lucide-react-native";
import { CartonListScreen } from "@/screens/CartonListScreen";
import { CartonDetailScreen } from "@/screens/CartonDetailScreen";
import { useTranslation } from "react-i18next";

const CartonNavigator = () => {
  const Stack = createNativeStackNavigator<CartonNavigatorParamList>();
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => {
          return <BackButton />;
        },
        headerRight: () => (
          <View className="flex-row items-center gap-2">
            {/* <ThemeToggle /> */}
            <LanguageSwitcher />
          </View>
        ),
      }}
    >
      <Stack.Screen
        name="CartonListScreen"
        options={{ title: t("screens.CartonListScreen.navigationTitle") }}
        component={CartonListScreen}
      />
      <Stack.Screen
        name="CartonDetailScreen"
        options={({ route }) => ({
          title: t("screens.CartonDetailScreen.navigationTitle", {
            cartonId: route.params.cartonId,
          }),
        })}
        component={CartonDetailScreen}
      />
    </Stack.Navigator>
  );
};

export const AppNavigator = () => {
  const Tab = createBottomTabNavigator<TabParamList>();
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="GameScreen"
        screenOptions={{
          headerLeft: () => {
            return <BackButton />;
          },
          headerRight: () => (
            <View className="flex-row items-center gap-2">
              {/* <ThemeToggle /> */}
              <LanguageSwitcher />
            </View>
          ),
        }}
      >
        <Tab.Screen
          name="GameScreen"
          options={{
            title: t("navigation.game"),
            tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
          }}
          component={GameScreen}
        />
        <Tab.Screen
          name="CartonNavigator"
          options={{
            title: t("navigation.cartonList"),
            headerShown: false,
            tabBarIcon: ({ color, size, focused }) => (
              <Package color={color} size={size} />
            ),
          }}
          component={CartonNavigator}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
