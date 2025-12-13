import { COLOR_BLANCO, COLOR_SECONDARY } from "@/config/data/consts";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
  telefono: string;
  onOpenModal: () => void;
};

const ButtonComponent: React.FC<ButtonProps> = ({ telefono, onOpenModal }) => {
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
    backgroundColor: COLOR_SECONDARY,
    borderWidth: 0,
    borderColor: "transparent",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  text: {
    color: COLOR_BLANCO,
    letterSpacing: 1,
    textAlign: "center",
    fontFamily: "PoppinsRegular",
  },
  disabled: {
    backgroundColor: "#075e5480",
  },
});

export default ButtonComponent;
