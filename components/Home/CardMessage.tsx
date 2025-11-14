import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { mensajesPredefinidos } from "@/config/data/consts";

interface Props {
  item: (typeof mensajesPredefinidos)[0];
}

const CardMessage = ({ item }: Props) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.categoryText}>{item.categoria}</Text>
      {item.mensajes.map((mensaje, index) => (
        <View key={index} style={styles.messageContainer}>
          <Text style={styles.messageText}>{mensaje}</Text>
        </View>
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
    padding: 5,
    marginBottom: 5,
  },
  messageText: {
    fontFamily: "PoppinsRegular",
    fontSize: 10,
  },
});
