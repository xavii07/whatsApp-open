import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import InputComponent from "../Input";
import SelectComponent from "../Select";
import ButtonComponent from "../Button";

const FormComponent = () => {
  const [codigo, setCodigo] = useState("+593");
  const [telefono, setTelefono] = useState("");

  console.log(codigo, telefono);

  return (
    <View style={styles.container}>
      <View style={styles.containerRectangle}>
        <View style={styles.containerSelect}>
          <SelectComponent onChangeCodigo={setCodigo} />
        </View>
        <View style={styles.containerInput}>
          <InputComponent onChangeInput={setTelefono} />
        </View>
      </View>
      <View style={{ alignSelf: "flex-end" }}>
        <ButtonComponent />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a0df0e",
  },
  containerRectangle: {
    flexDirection: "row",
    backgroundColor: "#e2faf5",
    borderRadius: 10,
    alignItems: "center",
  },
  containerSelect: {
    width: "50%",
  },
  containerInput: {
    width: "50%",
  },
});

export default FormComponent;
