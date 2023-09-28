import { View } from "react-native";
import React from "react";
import InputComponent from "../Input";
import SelectComponent from "../Select";

const FormComponent = () => {
  return (
    <View
      style={{
        flex: 2,

        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#e2faf5",
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <View style={{ width: "50%" }}>
          <SelectComponent />
        </View>
        <View
          style={{
            width: "50%",
          }}
        >
          <InputComponent />
        </View>
      </View>
    </View>
  );
};

export default FormComponent;
