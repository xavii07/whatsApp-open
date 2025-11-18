import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { obtenerMensajeAleatorio } from "@/config/utils/selectRandomMessage";

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
  if (!showTextarea) return null;

  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        {mensaje.length > 0 && (
          <>
            <Pressable
              onPress={() => setMensaje("")}
              style={({ pressed }) => [
                styles.actionButton,
                styles.improveButton,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              accessibilityLabel="Borrar mensaje"
              accessibilityRole="button"
            >
              <Ionicons name="trash-bin" size={18} color="#fff" />
            </Pressable>

            <Pressable
              onPress={() => console.log("Guardar como favorito")}
              style={({ pressed }) => [
                styles.actionButton,
                styles.setFavoriteButton,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              accessibilityLabel="Guardar mensaje como favorito"
              accessibilityRole="button"
            >
              <Ionicons name="star" size={18} color="#fff" />
            </Pressable>
          </>
        )}

        <Pressable
          onPress={() =>
            Alert.alert(
              "Genera mensaje con IA",
              "Funcionalidad en desarrollo..."
            )
          }
          style={({ pressed }) => [
            styles.actionButton,
            styles.iaGenerateButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          accessibilityLabel="Generar mensaje con IA (próximamente)"
          accessibilityRole="button"
        >
          <Ionicons name="bulb" size={18} color="#fff" />
        </Pressable>

        <Pressable
          onPress={() => {
            setMensaje(obtenerMensajeAleatorio());
          }}
          style={({ pressed }) => [
            styles.actionButton,
            styles.randomButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          accessibilityLabel="Generar mensaje aleatorio"
          accessibilityRole="button"
        >
          <Ionicons name="refresh" size={18} color="#fff" />
        </Pressable>

        <Pressable
          onPress={() => {
            setMensaje("");
            if (setShowTextarea) {
              setShowTextarea(false);
            }
          }}
          style={({ pressed }) => [
            styles.actionButton,
            styles.closeButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          accessibilityLabel="Cerrar editor"
          accessibilityRole="button"
        >
          <Ionicons name="close" size={18} color="#fff" />
        </Pressable>
      </View>

      <TextInput
        placeholder="Escribe tu mensaje aquí..."
        placeholderTextColor="#94a3b8"
        value={mensaje}
        onChangeText={setMensaje}
        multiline
        textAlignVertical="top"
        style={styles.textInput}
        numberOfLines={4}
      />
    </View>
  );
};

export default TextareaMessage;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 4,
    marginBottom: 8,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 4,
    minHeight: 100,
    maxHeight: 180,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 2,
    gap: 4,
  },
  actionButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  randomButton: {
    backgroundColor: "#10b981",
  },
  closeButton: {
    backgroundColor: "#ef4444",
  },
  setFavoriteButton: {
    backgroundColor: "#f0e925ff",
  },
  improveButton: {
    backgroundColor: "#eb7e57ff",
  },
  textInput: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    lineHeight: 18,
    color: "#1e293b",
    flex: 1,
    paddingTop: 4,
  },
  iaGenerateButton: {
    backgroundColor: "#6365f1",
  },
});
