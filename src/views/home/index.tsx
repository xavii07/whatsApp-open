import { View, StyleSheet } from "react-native";
import React from "react";
import FormComponent from "../../components/Form";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Header />
      </View>
      <FormComponent />
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
    backgroundColor: "#075e54",
  },
});

export default Home;
