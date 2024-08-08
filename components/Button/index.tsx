import React from "react";
import { URL_WHATSAPP } from "@/config/data/consts";
import { Linking, Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
  codigo: string;
  telefono: string;
};

const ButtonComponent: React.FC<ButtonProps> = ({ codigo, telefono }) => {
  const handlePressButton = () => {
    Linking.openURL(`${URL_WHATSAPP}/${codigo}${telefono}`);
  };

  return (
    <Pressable
      onPress={handlePressButton}
      disabled={!telefono}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        styles.button,
        !telefono && styles.disabled,
      ]}
    >
      <Text style={styles.text}>Abrir WhatsApp</Text>
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
    backgroundColor: "#075e5492",
  },
});

export default ButtonComponent;
