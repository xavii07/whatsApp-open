import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import InputComponent from "../Input";
import SelectComponent from "../Select";
import ButtonComponent from "../Button";
import { Country } from "@/config/data/countries";

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
      </View>
      <View style={styles.containerButton}>
        <ButtonComponent codigo={codigo} telefono={telefono} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    justifyContent: "center",
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
  },
  containerInput: {
    width: "50%",
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  containerButton: {
    marginTop: 20,
  },
});

export default FormComponent;
