import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface Props {
  subtitle?: string;
}

const Header = ({ subtitle }: Props) => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={styles.text}>WhatsLink</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#075e54bb",
    // height: "7%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    maxHeight: 60,
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: "PoppinsBold",
    letterSpacing: 1,
    fontSize: 18,
    color: "#fcfdff",
  },
  subtitle: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
    color: "#fff",
    letterSpacing: 0.4,
  },
});

export default Header;
