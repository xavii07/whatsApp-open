import { View, Text, StyleSheet } from "react-native";
import React from "react";
import FormComponent from "../../components/Form";

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "#596" }}>
        <Text>Formulário</Text>
      </View>
      <FormComponent />
      <View style={{ flex: 1, backgroundColor: "#2b4981" }}>
        <Text>Formulário</Text>
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
