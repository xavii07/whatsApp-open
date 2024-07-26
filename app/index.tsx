import { View, Text, Pressable } from "react-native";
import React from "react";
import { router } from "expo-router";

const index = () => {
  return (
    <View>
      <Text>index</Text>
      <Pressable
        onPress={() => {
          router.push("home");
        }}
      >
        <Text
          style={{
            color: "blue",
            textDecorationLine: "underline",
          }}
        >
          Ir a tabs
        </Text>
      </Pressable>
    </View>
  );
};

export default index;
