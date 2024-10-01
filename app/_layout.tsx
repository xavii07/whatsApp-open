import MyIcon from "@/components/ui/MyIcon";
import { useHistory } from "@/presentation/store/useHistory";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    PoppinsRegular: require("@/assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsBold: require("@/assets/fonts/Poppins/Poppins-Bold.ttf"),
  });

  const getHistory = useHistory((state) => state.getHistory);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    getHistory();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#25d366",
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Inicio",
            tabBarIcon: ({ color }) => (
              <MyIcon name="home-outline" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Historial",
            tabBarIcon: ({ color }) => (
              <MyIcon name="reader-outline" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="+not-found"
          options={{
            tabBarButton: () => null,
          }}
        />
      </Tabs>
    </ThemeProvider>
  );
}
