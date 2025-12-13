import FormComponent from "@/components/Form";
import Header from "@/components/Header";
import InfoApp from "@/components/Header/info/InfoApp";
import {
  COLOR_BLANCO,
  COLOR_PRIMARY,
  COLOR_SECONDARY_ACCENT,
} from "@/config/data/consts";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [showModalInfo, setShowModalInfo] = useState(false);
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <Image
        source={require("@/assets/images/fondo.png")}
        style={styles.fondo}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: bottom + 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Header>
            <Pressable
              style={({ pressed }) => [pressed && { opacity: 0.5 }]}
              onPress={() => setShowModalInfo(true)}
            >
              <Ionicons
                name="information-circle"
                size={24}
                color={COLOR_BLANCO}
              />
            </Pressable>
          </Header>
          <View style={styles.containerLabel}>
            <Text style={styles.label}> Escribe y envía al instante</Text>
            <Text style={styles.subtitle}>
              Ingresa cualquier número de teléfono
            </Text>
          </View>
          <FormComponent />
        </ScrollView>
      </KeyboardAvoidingView>
      <InfoApp
        onClose={() => setShowModalInfo(false)}
        visible={showModalInfo}
        accentColor={COLOR_PRIMARY}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_PRIMARY,
    position: "relative",
    zIndex: 0,
  },
  containerLabel: {
    marginTop: 14,
    backgroundColor: COLOR_SECONDARY_ACCENT,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderColor: COLOR_BLANCO,
    borderWidth: 1,
  },
  label: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    color: COLOR_BLANCO,
    textAlign: "center",
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
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    color: "#ddd",
  },
});
