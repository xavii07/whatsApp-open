import { View, StyleSheet } from "react-native";
import React from "react";
import { Button, Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "../../types";

const Footer = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParams, "History", "Home">
    >();

  const handleToHistory = () => navigation.navigate("History");
  const handleToHome = () => navigation.navigate("Home");

  return (
    <View style={styles.container}>
      <View style={styles.containerSquare}>
        <View style={{ flex: 1 }}>
          <Button buttonStyle={styles.button} onPress={handleToHome}>
            <Icon name={"home"} size={30} color={"#fff"} />
          </Button>
        </View>
        <View style={{ flex: 1 }}>
          <Button buttonStyle={styles.button} onPress={handleToHistory}>
            <Icon name={"history"} size={30} color={"#fff"} />
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#25d366",
    height: 50,
  },
  containerSquare: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#25d366",
  },
});

export default Footer;
