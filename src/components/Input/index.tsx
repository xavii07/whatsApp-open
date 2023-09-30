import React from "react";
import { Input } from "@rneui/themed";
import { StyleSheet } from "react-native";

type InputProps = {
  onChangeInput: (text: string) => void;
};

const InputComponent: React.FC<InputProps> = ({ onChangeInput }) => {
  return (
    <Input
      placeholder="XXXXX XXXXX"
      keyboardType="numeric"
      style={{
        marginTop: 20,
      }}
      textAlignVertical="center"
      placeholderTextColor={"#4b46467f"}
      inputStyle={styles.input}
      onChange={(e) => onChangeInput(e.nativeEvent.text)}
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
