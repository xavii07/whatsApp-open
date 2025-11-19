import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  Image,
  Platform,
  Alert,
  TextInput,
} from "react-native";
import { CardData } from "@/infrastructure/interfaces/history.response";
import { useHistory } from "@/presentation/store/useHistory";
import Ionicons from "@expo/vector-icons/Ionicons";
import ModalPicker from "../Home/ModalPicker";
import { useState } from "react";

interface Props {
  data: CardData;
  fecha: string;
}

const CardHistory = ({ data, fecha }: Props) => {
  const removeHistory = useHistory((state) => state.removeHistory);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nombreUser, setNombreUser] = useState(data.nombreUser);

  const openBusinessWhatsApp = async () => {
    const urlBusiness = `whatsapp-business://send?phone=${data.codigoPais}${data.telefono}`;
    const puedeAbrir = await Linking.canOpenURL(urlBusiness);

    if (puedeAbrir) {
      Linking.openURL(
        `whatsapp-business://send?phone=${data.codigoPais}${data.telefono}`
      );
    } else {
      Alert.alert(
        "Error",
        "No se pudo abrir WhatsApp Business. Verifica que esté instalado."
      );
    }
  };

  const openWhatsApp = async () => {
    const urlWhatsapp = `whatsapp://send?phone=${data.codigoPais}${data.telefono}`;
    const puedeAbrir = await Linking.canOpenURL(urlWhatsapp);

    if (puedeAbrir) {
      Linking.openURL(
        `whatsapp://send?phone=${data.codigoPais}${data.telefono}`
      );
    } else {
      Alert.alert(
        "Error",
        "No se pudo abrir WhatsApp. Verifica que esté instalado."
      );
    }
  };

  const openTelegram = async () => {
    const urlTelegram = `tg://resolve?domain=${data.codigoPais}${data.telefono}`;
    const puedeAbrir = await Linking.canOpenURL(urlTelegram);
    if (puedeAbrir) {
      Linking.openURL(`tg://resolve?domain=${data.codigoPais}${data.telefono}`);
    } else {
      Alert.alert(
        "Error",
        "No se pudo abrir Telegram. Verifica que esté instalado."
      );
    }
  };

  const openAppMessage = (tipoApp: string) => {
    if (tipoApp.toLowerCase() === "whatsapp") {
      openWhatsApp();
    } else if (tipoApp.toLowerCase() === "whatsapp business") {
      openBusinessWhatsApp();
    } else if (tipoApp.toLowerCase() === "telegram") {
      openTelegram();
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Eliminar registro",
      "¿Estás seguro de eliminar este registro del historial?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => removeHistory(fecha, data.id),
        },
      ]
    );
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleSaveName = () => {
    setIsModalVisible(false);
  };

  const getAppIcon = () => {
    if (data.tipoApp.toLowerCase().includes("whatsapp")) {
      return (
        <Image
          source={require("@/assets/images/whatsapp.png")}
          style={styles.appIcon}
        />
      );
    }
    return (
      <Image
        source={require("@/assets/images/telegrama.png")}
        style={styles.appIcon}
      />
    );
  };

  return (
    <View style={styles.containerCard}>
      <View style={styles.iconContainer}>{getAppIcon()}</View>
      <View style={styles.infoContainer}>
        <Text style={styles.nameText} numberOfLines={1}>
          {data.nombreUser || "Anónimo"}
        </Text>
        <Text style={styles.phoneText} numberOfLines={1}>
          {data.bandera} {data.codigoISO} ({data.codigoPais}) {data.telefono}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <Pressable
          onPress={handleOpenModal}
          style={({ pressed }) => [
            styles.actionButton,
            { backgroundColor: "#e0f2fe", borderColor: "#bae6fd" },
            { opacity: pressed ? 0.7 : 1 },
          ]}
          accessibilityLabel="Editar nombre de usuario"
          accessibilityRole="button"
        >
          <Ionicons name="pencil-outline" size={18} color="#3b82f6" />
        </Pressable>

        <Pressable
          onPress={handleDelete}
          style={({ pressed }) => [
            styles.actionButton,
            styles.deleteButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          accessibilityLabel="Eliminar del historial"
          accessibilityRole="button"
        >
          <Ionicons name="trash-bin" size={18} color="#ef4444" />
        </Pressable>

        <Pressable
          onPress={() => openAppMessage(data.tipoApp)}
          style={({ pressed }) => [
            styles.actionButton,
            styles.openButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          accessibilityLabel="Abrir conversación"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-forward" size={18} color="#10b981" />
        </Pressable>
      </View>

      <ModalPicker
        isModalVisible={isModalVisible}
        onModalClose={() => setIsModalVisible(false)}
        text="Editar nombre de contacto"
      >
        <View style={styles.container}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Juan Pérez"
              placeholderTextColor="#9ca3af"
              style={styles.input}
              value={nombreUser}
              onChangeText={(text) => setNombreUser(text.slice(0, 20))}
            />

            <Pressable
              onPress={handleSaveName}
              style={({ pressed }) => [
                styles.iconButtonRight,
                { opacity: pressed ? 0.6 : 1 },
              ]}
            >
              <Ionicons name="checkmark" size={25} color="#fff" />
            </Pressable>
          </View>
        </View>
      </ModalPicker>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    flexDirection: "row",
    backgroundColor: "#075e54bb",
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  iconContainer: {
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    padding: 10,
    marginRight: 12,
  },

  appIcon: {
    width: 20,
    height: 20,
  },

  infoContainer: {
    flex: 1,
    marginRight: 8,
  },

  nameText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 13,
    color: "#fff",
    marginBottom: 2,
  },

  phoneText: {
    fontFamily: "PoppinsRegular",
    fontSize: 11,
    color: "#fff",
    lineHeight: 16,
  },

  actionsContainer: {
    flexDirection: "row",
    gap: 4,
  },

  actionButton: {
    width: 25,
    height: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },

  deleteButton: {
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
  },

  openButton: {
    backgroundColor: "#f0fdf4",
    borderColor: "#bbf7d0",
  },

  container: {
    paddingHorizontal: 20,
    marginTop: 15,
  },

  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },

  input: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingLeft: 14,
    paddingRight: 90,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    fontFamily: "PoppinsRegular",
    color: "#111827",
    fontSize: 14,
  },

  iconButtonRight: {
    position: "absolute",
    right: 0,
    top: 0,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    width: 50,
    height: "100%",
    backgroundColor: "#10b981",
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});

export default CardHistory;
