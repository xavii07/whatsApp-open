import FormComponent from "@/components/Form";
import Header from "@/components/Header";
import InfoApp from "@/components/Header/InfoApp";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [showModalInfo, setShowModalInfo] = useState(false);
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <Image
        source={require("@/assets/images/fondo.png")}
        style={styles.fondo}
      />
      <Header>
        <Pressable
          style={({ pressed }) => [pressed && { opacity: 0.5 }]}
          onPress={() => setShowModalInfo(true)}
        >
          <Ionicons name="information-circle" size={24} color="#fff" />
        </Pressable>
      </Header>
      <FormComponent />
      <InfoApp
        onClose={() => setShowModalInfo(false)}
        visible={showModalInfo}
        accentColor="#25D366"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25D366",
    position: "relative",
    zIndex: 0,
  },
  fondo: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    zIndex: -1,
    opacity: 0.9,
  },
  subtitle: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
    color: "#fff",
    letterSpacing: 0.4,
  },
});
