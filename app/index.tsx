import FormComponent from "@/components/Form";
import Header from "@/components/Header";
import ModalApps from "@/components/Home/ModalApps";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <Header />
      <FormComponent />

      <Image
        source={require("@/assets/images/fondo.png")}
        style={styles.fondo}
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
});
