import "./global.css";
import * as React from "react";
import { View, Text, Platform } from "react-native";
import {
  NavigationContainer,
  Theme,
  DefaultTheme,
  DarkTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./screens/HomeScreen";
import { PortalHost } from "@rn-primitives/portal";
import { LanguageSwitcher } from "./components/LanguageSwitcher";
import { NAV_THEME } from "./lib/constants";
import { useColorScheme } from "./lib/useColorScheme";
import { StatusBar } from "expo-status-bar";
import "./i18n";
import { useTranslation } from "react-i18next";

const Stack = createNativeStackNavigator();

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

function App() {
  const hasMounted = React.useRef(false);
  const { colorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  const { t } = useTranslation();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DARK_THEME : LIGHT_THEME}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerRight: () => (
              <View className="flex-row items-center gap-2">
                {/* <ThemeToggle /> */}
                <LanguageSwitcher />
              </View>
            ),
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <PortalHost />
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}

export default App;
