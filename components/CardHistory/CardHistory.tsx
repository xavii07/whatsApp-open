import { View, Text, StyleSheet, Pressable, Linking } from "react-native";
import MyIcon from "../ui/MyIcon";
import { CardData } from "@/infrastructure/interfaces/history.response";
import { useHistory } from "@/presentation/store/useHistory";
import { URL_WHATSAPP } from "@/config/data/consts";

interface Props {
  data: CardData;
  fecha: string;
}

const CardHistory = ({ data, fecha }: Props) => {
  const removeHistory = useHistory((state) => state.removeHistory);

  const openWhatsApp = () => {
    Linking.openURL(`${URL_WHATSAPP}/${data.codigoPais}${data.telefono}`);
  };

  return (
    <View style={styles.containerCard}>
      <View style={styles.cardIcon}>
        <MyIcon name="logo-whatsapp" size={15} />
      </View>
      <View>
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
          onPress={() => openWhatsApp()}
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
    backgroundColor: "#25D36622",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    borderRadius: 5,
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
    color: "#000",
  },
});

export default CardHistory;
