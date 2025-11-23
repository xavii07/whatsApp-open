import MyIcon from "@/components/ui/MyIcon";
import { useHistory } from "@/presentation/store/useHistory";
import { useMessagesStore } from "@/presentation/store/useMessages";
import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    PoppinsRegular: require("@/assets/fonts/Poppins/Poppins-Regular.ttf"),
    PoppinsBold: require("@/assets/fonts/Poppins/Poppins-Bold.ttf"),
  });

  const getHistory = useHistory((state) => state.getHistory);
  const getMessagesFavoritos = useMessagesStore(
    (state) => state.getMessagesFavoritos
  );

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    getMessagesFavoritos();
  }, []);

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
      </Tabs>
    </ThemeProvider>
  );
}
