import React from "react";
import { URL_WHATSAPP } from "@/config/data/consts";
import { Linking, Pressable, StyleSheet, Text } from "react-native";
import { useHistory } from "@/presentation/store/useHistory";
import { countries, Country } from "@/config/data/countries";
import uuid from "react-native-uuid";

type ButtonProps = {
  codigo: string;
  telefono: string;
  mensaje?: string;
  onOpenModal: () => void;
};

const ButtonComponent: React.FC<ButtonProps> = ({
  codigo,
  telefono,
  mensaje,
  onOpenModal,
}) => {
  console.log({ telefono });
  const addHistory = useHistory((state) => state.addHistory);

  const abrirChat = async () => {
    const urlWhatsapp = `whatsapp://send?phone=${codigo}${telefono}&text=${
      mensaje || ""
    }`;
    const urlBusiness = `whatsapp-business://send?phone=${codigo}${telefono}&text=${
      mensaje || ""
    }`;
    const urlTelegram = `tg://resolve?domain=${codigo}${telefono}&text=${
      mensaje || ""
    }`;

    const puedeAbrir = await Linking.canOpenURL(urlWhatsapp);
    const puedeAbrirBusiness = await Linking.canOpenURL(urlBusiness);
    const puedeAbrirTelegram = await Linking.canOpenURL(urlTelegram);

    if (puedeAbrirTelegram) {
      console.log("Abriendo Telegram");
      Linking.openURL(urlTelegram);
    } else if (puedeAbrir) {
      Linking.openURL(urlWhatsapp);
      console.log("Abriendo WhatsApp");
    } else if (puedeAbrirBusiness) {
      Linking.openURL(urlBusiness);
      console.log("Abriendo WhatsApp Business");
    } else {
      alert("No se encontró ninguna app de mensajería instalada.");
    }
  };

  const handlePressButton = () => {
    Linking.openURL(
      `${URL_WHATSAPP}/${codigo}${telefono}?text=${mensaje || ""}`
    );
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
      },
      new Date().toISOString().split("T")[0]
    );
  };

  return (
    <Pressable
      onPress={onOpenModal}
      disabled={!telefono}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.8 : 1,
        },
        styles.button,
        !telefono && styles.disabled,
      ]}
    >
      <Text style={styles.text}>Enviar Mensaje</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#075e54",
    borderWidth: 0,
    borderColor: "transparent",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  text: {
    color: "#fff",
    letterSpacing: 1,
    textAlign: "center",
    fontFamily: "PoppinsRegular",
  },
  disabled: {
    backgroundColor: "#075e5480",
  },
});

export default ButtonComponent;
