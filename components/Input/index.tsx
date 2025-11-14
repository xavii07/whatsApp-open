import React from "react";
import { StyleSheet, TextInput } from "react-native";

type InputProps = {
  onChangeInput: (text: string) => void;
};

const InputComponent: React.FC<InputProps> = ({ onChangeInput }) => {
  return (
    <TextInput
      placeholder="XXXXX XXXXX"
      keyboardType="phone-pad"
      textAlignVertical="center"
      placeholderTextColor={"#4b46467f"}
      style={[styles.input]}
      onChange={(e) => onChangeInput(e.nativeEvent.text)}
      collapsable={true}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    fontSize: 15,
    paddingLeft: 5,
    letterSpacing: 1,
    fontFamily: "PoppinsRegular",
  },
});

export default InputComponent;
