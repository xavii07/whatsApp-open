import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={styles.container}>
      <View
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}
      >
        <Text style={styles.text}>WhatsLink</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25d366",
    height: "7%",
  },
  text: {
    fontFamily: "PoppinsBold",
    letterSpacing: 1,
    fontSize: 18,
    color: "#fcfdff",
  },
});

export default Header;
