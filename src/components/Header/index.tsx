import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Header = () => {
  return (
    <View style={styles.container}>
      <View
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: 20 }}
      >
        <Text
          style={{
            fontWeight: "bold",
            letterSpacing: 1,
            fontSize: 16,
            color: "#fcfdff",
          }}
        >
          WhatsLink
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25d366",
    height: 50,
  },
});

export default Header;
