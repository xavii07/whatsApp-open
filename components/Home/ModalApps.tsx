import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import ModalPicker from "./ModalPicker";

interface Props {
  isModalVisible: boolean;
  onModalClose: () => void;
}

const ModalApps = ({ isModalVisible, onModalClose }: Props) => {
  return (
    <ModalPicker isVisible={isModalVisible} onClose={onModalClose}>
      <View style={styles.container}>
        <Pressable
          onPress={onModalClose}
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
        >
          <Image
            source={require("@/assets/images/whatsapp.png")}
            style={styles.image}
          />
          <Text style={styles.text}>WhatsApp</Text>
        </Pressable>
        <Pressable
          onPress={onModalClose}
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
        >
          <Image
            source={require("@/assets/images/telegrama.png")}
            style={styles.image}
          />
          <Text style={styles.text}>Telegram</Text>
        </Pressable>
      </View>
    </ModalPicker>
  );
};

export default ModalApps;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
    height: "70%",
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: "center",
  },
  text: {
    color: "#ccc",
    textAlign: "center",
    fontFamily: "PoppinsRegular",
    fontSize: 12,
  },
});
