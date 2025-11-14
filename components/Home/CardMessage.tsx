import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React from "react";
import { mensajesPredefinidos } from "@/config/data/consts";

interface Props {
  item: (typeof mensajesPredefinidos)[0];
  setMessage?: (message: string) => void;
  setShowTextarea?: (show: boolean) => void;
}

const CardMessage = ({ item, setMessage, setShowTextarea }: Props) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.categoryText}>{item.categoria}</Text>
      {item.mensajes.map((mensaje, index) => (
        <Pressable
          onPress={() => {
            if (setMessage) setMessage(mensaje);
            if (setShowTextarea) setShowTextarea(true);
          }}
          key={index}
          style={({ pressed }) => [
            styles.messageContainer,
            { elevation: 1, opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <Text style={styles.messageText}>{mensaje}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
};

export default CardMessage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e2faf5",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 0,
    paddingTop: 5,
    marginRight: 5,
    width: 300,
  },
  categoryText: {
    fontFamily: "PoppinsBold",
    fontSize: 12,
    marginBottom: 5,
    textAlign: "center",
  },
  messageContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 5,
    padding: 7,
    marginBottom: 5,
  },
  messageText: {
    fontFamily: "PoppinsRegular",
    fontSize: 10,
  },
});
