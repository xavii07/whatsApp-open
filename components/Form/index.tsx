import { FlatList, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import InputComponent from "../Input";
import SelectComponent from "../Select";
import ButtonComponent from "../Button";
import { mensajesPredefinidos } from "@/config/data/consts";
import CardMessage from "../Home/CardMessage";
import TextareaMessage from "../Home/TextareaMessage";

const FormComponent = () => {
  const [codigo, setCodigo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [showTextarea, setShowTextarea] = useState(false);

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
      <View style={styles.containerCards}>
        <FlatList
          data={mensajesPredefinidos}
          horizontal
          keyExtractor={(item) => item.categoria}
          renderItem={({ item }) => (
            <CardMessage
              item={item}
              setMessage={setMensaje}
              setShowTextarea={setShowTextarea}
            />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <TextareaMessage
        showTextarea={showTextarea}
        mensaje={mensaje}
        setMensaje={setMensaje}
        setShowTextarea={setShowTextarea}
      />

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
  containerCards: {
    marginTop: 5,
    width: "100%",
    height: 110,
  },
});

export default FormComponent;
