import { FlatList, StyleSheet, View, Platform, Dimensions } from "react-native";
import React, { useState } from "react";
import InputComponent from "../Input";
import SelectComponent from "../Select";
import ButtonComponent from "../Button";
import { mensajesPredefinidos } from "@/config/data/consts";
import CardMessage from "../Home/CardMessage";
import TextareaMessage from "../Home/TextareaMessage";

const { width } = Dimensions.get("window");
const isSmallScreen = width < 375;

const FormComponent = () => {
  const [codigo, setCodigo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [showTextarea, setShowTextarea] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.phoneSection}>
        <View style={styles.phoneInputWrapper}>
          <View style={styles.selectWrapper}>
            <SelectComponent onChangeCodigo={setCodigo} />
          </View>
          <View style={styles.inputWrapper}>
            <InputComponent onChangeInput={setTelefono} />
          </View>
        </View>
      </View>

      <View style={styles.messagesSection}>
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
          contentContainerStyle={styles.listContent}
          snapToInterval={292}
          decelerationRate="fast"
        />
      </View>

      <TextareaMessage
        showTextarea={showTextarea}
        mensaje={mensaje}
        setMensaje={setMensaje}
        setShowTextarea={setShowTextarea}
      />

      <View style={styles.buttonSection}>
        <ButtonComponent codigo={codigo} telefono={telefono} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: isSmallScreen ? 16 : 20,
    paddingVertical: 16,
    justifyContent: "center",
  },

  phoneSection: {
    marginBottom: 4,
  },

  phoneInputWrapper: {
    flexDirection: "row",
    paddingHorizontal: 8,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  selectWrapper: {
    justifyContent: "center",
    // flex: isSmallScreen ? 0.4 : 0.35,
    borderRightWidth: 1,
    borderRightColor: "#e2e8f0",
  },
  inputWrapper: {
    flex: isSmallScreen ? 0.6 : 0.65,
  },
  messagesSection: {
    height: 200,
  },
  listContent: {
    paddingVertical: 8,
  },
  buttonSection: {
    marginTop: 4,
    alignItems: "center",
  },
});

export default FormComponent;
