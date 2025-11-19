import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import ModalPicker from "./ModalPicker";
import { useHistory } from "@/presentation/store/useHistory";
import { countries, Country } from "@/config/data/countries";
import uuid from "react-native-uuid";

interface Props {
  isModalVisible: boolean;
  onModalClose: () => void;
  codigo: string;
  telefono: string;
  mensaje?: string;
}

const ModalApps = ({
  isModalVisible,
  onModalClose,
  codigo,
  telefono,
  mensaje,
}: Props) => {
  const addHistory = useHistory((state) => state.addHistory);

  const addMessageToHistory = (tipoApp: string) => {
    const country = countries.find(
      (country: Country) => country.codigoPais === codigo
    );
    addHistory(
      {
        id: uuid.v4() as string,
        codigoISO: country?.codigoISO ?? "",
        bandera: country?.bandera ?? "",
        codigoPais: codigo,
        telefono,
        nombreUser: "Anonimo",
        tipoApp,
      },
      new Date().toISOString().split("T")[0]
    );
  };

  const openAppWhatsApp = async () => {
    const urlWhatsapp = `whatsapp://send?phone=${codigo}${telefono}&text=${
      mensaje || ""
    }`;
    const urlBusiness = `whatsapp-business://send?phone=${codigo}${telefono}&text=${
      mensaje || ""
    }`;
    const puedeAbrirWhatsapp = await Linking.canOpenURL(urlWhatsapp);
    const puedeAbrirBusiness = await Linking.canOpenURL(urlBusiness);

    if (puedeAbrirWhatsapp) {
      addMessageToHistory("WhatsApp");
      Linking.openURL(urlWhatsapp);
      onModalClose();
    } else if (puedeAbrirBusiness) {
      addMessageToHistory("WhatsApp Business");
      Linking.openURL(urlBusiness);
      onModalClose();
    } else {
      alert("No se encontró WhatsApp instalado.");
    }
  };

  const openAppTelegram = async () => {
    const puedeAbrir = await Linking.canOpenURL(
      `tg://resolve?domain=${codigo}${telefono}`
    );

    if (puedeAbrir) {
      addMessageToHistory("Telegram");
      Linking.openURL(
        `tg://resolve?domain=${codigo}${telefono}&text=${mensaje || ""}`
      );
      onModalClose();
    } else {
      alert("No se encontró Telegram instalado.");
    }
  };

  return (
    <ModalPicker
      text="Selecciona la aplicación"
      isModalVisible={isModalVisible}
      onModalClose={onModalClose}
    >
      <View style={styles.container}>
        <Pressable
          onPress={openAppWhatsApp}
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
        >
          <Image
            source={require("@/assets/images/whatsapp.png")}
            style={styles.image}
          />
          <Text style={styles.text}>WhatsApp</Text>
        </Pressable>
        <Pressable
          onPress={openAppTelegram}
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
        >
          <Image
            source={require("@/assets/images/telegrama.png")}
            style={styles.image}
          />
          <Text style={styles.text}>Telegram</Text>
        </Pressable>
      </View>
    </ModalPicker>
  );
};

export default ModalApps;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
    height: "70%",
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: "center",
  },
  text: {
    color: "#ccc",
    textAlign: "center",
    fontFamily: "PoppinsRegular",
    fontSize: 12,
  },
});
