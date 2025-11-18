import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
  Image,
} from "react-native";
import MyIcon from "../ui/MyIcon";
import { CardData } from "@/infrastructure/interfaces/history.response";
import { useHistory } from "@/presentation/store/useHistory";

interface Props {
  data: CardData;
  fecha: string;
}

const CardHistory = ({ data, fecha }: Props) => {
  const removeHistory = useHistory((state) => state.removeHistory);

  const openBusinessWhatsApp = async () => {
    const urlBusiness = `whatsapp-business://send?phone=${data.codigoPais}${data.telefono}`;
    const puedeAbrir = await Linking.canOpenURL(urlBusiness);

    if (puedeAbrir) {
      Linking.openURL(
        `whatsapp-business://send?phone=${data.codigoPais}${data.telefono}`
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
    }
  };

  const openTelegram = async () => {
    const urlTelegram = `tg://resolve?domain=${data.codigoPais}${data.telefono}`;
    const puedeAbrir = await Linking.canOpenURL(urlTelegram);
    if (puedeAbrir) {
      Linking.openURL(`tg://resolve?domain=${data.codigoPais}${data.telefono}`);
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

  return (
    <View style={styles.containerCard}>
      <View style={styles.cardIcon}>
        {data.tipoApp.toLowerCase().includes("whatsapp") ? (
          <Image
            source={require("@/assets/images/whatsapp.png")}
            style={{ width: 14, height: 14 }}
          />
        ) : (
          <Image
            source={require("@/assets/images/telegrama.png")}
            style={{ width: 14, height: 14 }}
          />
        )}
      </View>
      <View>
        <Text style={[styles.cardText, { color: "#ddd" }]}>
          {data.nombreUser || "Anonimo"}
        </Text>
        <Text style={styles.cardText}>
          {data.bandera} {data.codigoISO} ({data.codigoPais}) {data.telefono}
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable
          onPress={() => removeHistory(fecha, data.id)}
          style={({ pressed }) => ({
            backgroundColor: pressed ? "#25D366FF" : "#fff",
            borderRadius: 10,
            padding: 4,
          })}
        >
          <MyIcon name="trash" />
        </Pressable>
        <Pressable
          onPress={() => openAppMessage(data.tipoApp)}
          style={({ pressed }) => ({
            backgroundColor: pressed ? "#25D36699" : "#fff",
            borderRadius: 10,
            padding: 4,
          })}
        >
          <MyIcon name="arrow-forward" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCard: {
    flexDirection: "row",
    backgroundColor: "#075e54ff",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    shadowColor: "#fff",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0.75,
    elevation: 1,
  },
  cardIcon: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 8,
  },
  cardText: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    color: "#fff",
  },
});

export default CardHistory;
