import { View, TextInput, StyleSheet, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  showTextarea: boolean;
  mensaje: string;
  setMensaje: (mensaje: string) => void;
  setShowTextarea?: (show: boolean) => void;
}

const TextareaMessage = ({
  showTextarea,
  mensaje,
  setMensaje,
  setShowTextarea,
}: Props) => {
  return (
    <>
      {showTextarea && (
        <View style={styles.container}>
          <Pressable
            onPress={() => {
              setMensaje("");
              if (setShowTextarea) {
                setShowTextarea(false);
              }
            }}
            style={({ pressed }) => [
              styles.closeButtonCloseTextarea,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <Ionicons name="close" size={16} color="white" />
          </Pressable>
          {mensaje && (
            <Pressable
              onPress={() => {
                setMensaje("");
              }}
              style={({ pressed }) => [
                styles.closeButtonCleanTextarea,
                { opacity: pressed ? 0.6 : 1 },
              ]}
            >
              <Ionicons name="refresh" size={16} color="white" />
            </Pressable>
          )}
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
    paddingLeft: 10,
    paddingRight: 20,
    paddingVertical: 5,
    maxHeight: 150,
    position: "relative",
  },
  textInput: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
  },
  closeButtonCloseTextarea: {
    position: "absolute",
    top: 2,
    right: 3,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ff5c5c",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonCleanTextarea: {
    position: "absolute",
    top: 25,
    right: 3,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#4caf50",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
