import { View, TextInput, StyleSheet } from "react-native";
import React from "react";

interface Props {
  showTextarea: boolean;
  mensaje: string;
  setMensaje: (mensaje: string) => void;
}

const TextareaMessage = ({ showTextarea, mensaje, setMensaje }: Props) => {
  return (
    <>
      {showTextarea && (
        <View style={styles.container}>
          <TextInput
            placeholder="Escribe tu mensaje aquí..."
            value={mensaje}
            onChangeText={setMensaje}
            multiline
            style={styles.textInput}
          />
        </View>
      )}
    </>
  );
};

export default TextareaMessage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 5,
    backgroundColor: "#e2faf5",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxHeight: 150,
  },
  textInput: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
  },
});
