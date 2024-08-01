import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import InputComponent from "../Input";
import SelectComponent from "../Select";
import ButtonComponent from "../Button";

const FormComponent = () => {
  const [codigo, setCodigo] = useState("");
  const [telefono, setTelefono] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.containerRectangle}>
        <View style={styles.containerSelect}>
          <SelectComponent onChangeCodigo={setCodigo} />
        </View>
        <View style={styles.containerInput}>
          <InputComponent onChangeInput={setTelefono} />
        </View>
        <View style={styles.containerButton}>
          <ButtonComponent codigo={codigo} telefono={telefono} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },

  containerRectangle: {
    flexDirection: "row",
    backgroundColor: "#e2faf5",
    borderRadius: 10,
    alignItems: "center",
  },
  containerSelect: {
    width: "50%",
    position: "relative",
  },
  containerInput: {
    width: "50%",
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  containerButton: {
    position: "absolute",
    backgroundColor: "#25d366",
    bottom: -40,
  },
});

export default FormComponent;
