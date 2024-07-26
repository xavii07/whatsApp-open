import React from "react";
import { StyleSheet, TextInput } from "react-native";

type InputProps = {
  onChangeInput: (text: string) => void;
};

const InputComponent: React.FC<InputProps> = ({ onChangeInput }) => {
  return (
    <TextInput
      placeholder="XXXXX XXXXX"
      keyboardType="numeric"
      textAlignVertical="center"
      placeholderTextColor={"#4b46467f"}
      style={[styles.input, { marginTop: 20 }]}
      onChange={(e) => onChangeInput(e.nativeEvent.text)}
      collapsable={true}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    paddingLeft: 10,
    letterSpacing: 1,
    fontWeight: "bold",
  },
});

export default InputComponent;
