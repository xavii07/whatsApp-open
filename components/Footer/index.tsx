import { View, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "@/infrastructure/types/index";
import MyIcon from "../ui/MyIcon";

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
          <Pressable onPress={handleToHome}>
            <MyIcon name={"home"} size={30} color={"#fff"} />
          </Pressable>
        </View>
        <View style={{ flex: 1 }}>
          <Pressable onPress={handleToHistory}>
            <MyIcon name={"history"} size={30} color={"#fff"} />
          </Pressable>
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
