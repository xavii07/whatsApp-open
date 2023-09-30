import React from "react";
import { Button } from "@rneui/themed";
import { URL_WHATSAPP } from "../../data/consts";
import { Linking } from "react-native";

type ButtonProps = {
  codigo: string;
  telefono: string;
};

const ButtonComponent: React.FC<ButtonProps> = ({ codigo, telefono }) => {
  const handlePressButton = () => {
    Linking.openURL(`${URL_WHATSAPP}/${codigo}${telefono}`);
  };

  return (
    <Button
      type="solid"
      title="Abrir WhatsApp"
      onPress={handlePressButton}
      disabled={!telefono}
      disabledStyle={{
        backgroundColor: "#25d36552",
      }}
      titleStyle={{
        color: "#fff",
        fontWeight: "bold",
        letterSpacing: 1,
      }}
      buttonStyle={{
        backgroundColor: "#25d366",
        borderWidth: 0,
        borderColor: "transparent",
        width: "100%",
        height: 50,
      }}
    />
  );
};

export default ButtonComponent;
