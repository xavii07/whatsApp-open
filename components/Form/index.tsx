import {
  ScrollView,
  StyleSheet,
  View,
  Platform,
  Dimensions,
  Pressable,
  Text,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { router } from "expo-router";
import InputComponent from "../Input";
import SelectComponent from "../Select";
import ButtonComponent from "../Button";
import TextareaMessage from "../Home/TextareaMessage";
import ModalApps from "../Home/ModalApps";
import { useMessagesStore } from "@/presentation/store/useMessages";
import { COLOR_BLANCO } from "@/config/data/consts";

const { width } = Dimensions.get("window");
const isSmallScreen = width < 375;

const getCardWidthByWords = (message: string) => {
  const charsCount = message.trim().length;
  const base = isSmallScreen ? 120 : 140;
  const widthByChars = base + charsCount * 4;

  return Math.max(base, widthByChars);
};

const FormComponent = () => {
  const [codigo, setCodigo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [showTextarea, setShowTextarea] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { favoritos, getMessagesFavoritos } = useMessagesStore();

  useEffect(() => {
    getMessagesFavoritos();
  }, [getMessagesFavoritos]);

  const favoriteRows = useMemo(() => {
    const rows = 3;
    const groupedRows: string[][] = Array.from({ length: rows }, () => []);

    favoritos.mensajes.forEach((message, index) => {
      const rowIndex = index % rows;
      groupedRows[rowIndex].push(message);
    });

    return groupedRows;
  }, [favoritos.mensajes]);

  const onSelectFavoriteMessage = (favoriteMessage: string) => {
    setMensaje(favoriteMessage);
    setShowTextarea(true);
  };

  const onOpenModal = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          decelerationRate="fast"
        >
          {favoritos.mensajes.length === 0 ? (
            <Pressable
              onPress={() => router.push("/mensajes")}
              style={({ pressed }) => [
                styles.emptyCard,
                { opacity: pressed ? 0.85 : 1 },
              ]}
            >
              <Text style={styles.emptyText}>
                Guarda mensajes en la pestaña Favoritos para verlos aquí.
              </Text>
            </Pressable>
          ) : (
            <View style={styles.rowsContainer}>
              {favoriteRows.map((row, rowIndex) => (
                <View key={`row-${rowIndex}`} style={styles.row}>
                  {row.map((favoriteMessage) => (
                    <Pressable
                      key={`${favoriteMessage}-${rowIndex}`}
                      onPress={() => onSelectFavoriteMessage(favoriteMessage)}
                      style={({ pressed }) => [
                        styles.bentoCard,
                        { width: getCardWidthByWords(favoriteMessage) },
                        { opacity: pressed ? 0.8 : 1 },
                      ]}
                    >
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="clip"
                        style={styles.bentoText}
                      >
                        {favoriteMessage}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>

      <TextareaMessage
        showTextarea={showTextarea}
        mensaje={mensaje}
        setMensaje={setMensaje}
        setShowTextarea={setShowTextarea}
      />

      <View style={styles.buttonSection}>
        <ButtonComponent
          telefono={telefono.trim().replace(/\s+/g, "")}
          onOpenModal={onOpenModal}
        />
      </View>

      <ModalApps
        isModalVisible={isModalVisible}
        onModalClose={onModalClose}
        codigo={codigo}
        telefono={telefono.trim().replace(/\s+/g, "")}
        mensaje={mensaje}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: isSmallScreen ? 16 : 20,
    // paddingVertical: 16,
    // justifyContent: "center",
  },

  phoneSection: {
    marginBottom: 4,
  },

  phoneInputWrapper: {
    flexDirection: "row",
    paddingHorizontal: 8,
    backgroundColor: COLOR_BLANCO,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
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
    width: "100%",
  },
  messagesSection: {
    marginBottom: 4,
  },
  listContent: {
    paddingVertical: 8,
    paddingRight: 8,
  },
  rowsContainer: {
    gap: 6,
  },
  row: {
    flexDirection: "row",
    gap: 6,
    alignItems: "flex-start",
  },
  bentoCard: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 4,
    minHeight: 6,
    justifyContent: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    flexShrink: 0,
  },
  bentoText: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    color: "#1e293b",
    lineHeight: 18,
  },
  emptyCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 16,
    width: "100%",
  },
  emptyText: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    color: "#334155",
    lineHeight: 12,
  },
  buttonSection: {
    marginTop: 4,
    alignItems: "center",
  },
});

export default FormComponent;
