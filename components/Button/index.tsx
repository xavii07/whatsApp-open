import React from "react";
import { URL_WHATSAPP } from "@/config/data/consts";
import { Linking, Pressable, Text } from "react-native";

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
      //type="solid"
      //title="Abrir WhatsApp"
      onPress={handlePressButton}
      disabled={!telefono}
      //disabledStyle={{backgroundColor: "#25d36552",}}
      //titleStyle={{color: "#fff",fontWeight: "bold",letterSpacing: 1,}}
      //buttonStyle={{backgroundColor: "#25d366",borderWidth: 0,borderColor: "transparent",width: "100%",height: 50,}}
    >
      <Text>Abrir WhatsApp</Text>
    </Pressable>
  );
};

export default ButtonComponent;
