import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import { mensajesPredefinidos } from "@/config/data/consts";

interface Props {
  item: (typeof mensajesPredefinidos)[0];
  setMessage?: (message: string) => void;
  setShowTextarea?: (show: boolean) => void;
}

const CardMessage = ({ item, setMessage, setShowTextarea }: Props) => {
  const handlePress = (mensaje: string) => {
    if (setMessage) setMessage(mensaje);
    if (setShowTextarea) setShowTextarea(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.categoryText}>{item.categoria}</Text>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {item.mensajes.map((mensaje, index) => (
          <Pressable
            onPress={() => handlePress(mensaje)}
            key={index}
            style={({ pressed }) => [
              styles.messageCard,
              {
                transform: [{ scale: pressed ? 0.98 : 1 }],
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            accessibilityLabel={`Seleccionar mensaje: ${mensaje}`}
            accessibilityRole="button"
          >
            <Text style={styles.messageText} numberOfLines={3}>
              {mensaje}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default CardMessage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginRight: 12,
    width: 280,
    maxHeight: 320,
    borderWidth: 1,
    paddingBottom: 1,
    borderColor: "#e2e8f0",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  header: {
    backgroundColor: "#075e54ff",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  categoryText: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    color: "#ffffff",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  messagesContainer: {
    paddingHorizontal: 12,
    marginTop: 4,
  },
  messageCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    minHeight: 50,
    justifyContent: "center",
    marginBottom: 4,
  },
  messageText: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    lineHeight: 18,
    color: "#475569",
  },
});
