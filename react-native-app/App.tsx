import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform } from "react-native";
import "./global.css";
import "./src/i18n";
import { NAV_THEME } from "./src/lib/constants";
import { useColorScheme } from "./src/lib/useColorScheme";
import { AppNavigator } from "./src/navigation/Navigator";

const Tab = createBottomTabNavigator();

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

  return (
    <ThemeProvider value={colorScheme === "dark" ? DARK_THEME : LIGHT_THEME}>
      <AppNavigator />
      <PortalHost />
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}

export default App;
