import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const History = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Header />
      </View>
      <View>
        <Text>skjdfhjk</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
        }}
      >
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
});

export default History;
