import React from "react";
import { Input } from "@rneui/themed";

const InputComponent = () => {
  return (
    <Input
      placeholder="XXXXX XXXXX"
      keyboardType="numeric"
      style={{
        marginTop: 20,
      }}
      textAlignVertical="center"
      placeholderTextColor={"#4b46467f"}
      inputStyle={{
        fontSize: 16,
        paddingLeft: 10,
        letterSpacing: 1,
        fontWeight: "bold",
      }}
      onChange={(e) => {
        console.log(e.nativeEvent.text);
      }}
    />
  );
};

export default InputComponent;
