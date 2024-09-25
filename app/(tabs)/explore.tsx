import CardHistory from "@/components/CardHistory/CardHistory";
import Header from "@/components/Header";
import {
  CardData,
  HistoryData,
} from "@/infrastructure/interfaces/history.response";
import { useHistory } from "@/presentation/store/useHistory";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const { top } = useSafeAreaInsets();

  const { history } = useHistory();

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "America/Guayaquil",
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return new Date(date).toLocaleDateString("es-EC", options);
  };

  const renderSection = ({ item }: { item: HistoryData }) => (
    <>
      <Text style={styles.textDate}>{formatDate(item.date)}</Text>
      {item.data.map((data: CardData) => (
        <CardHistory data={data} fecha={item.date} />
      ))}
    </>
  );

  const sections: HistoryData[] = Object.keys(history).map((date) => ({
    date,
    data: history[date] ?? [],
  }));

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <Header />

      <Text style={styles.title}>EXPLORAR HISTORIAL</Text>

      <Image
        source={require("@/assets/images/fondo.png")}
        style={styles.fondo}
      />

      <FlatList
        data={sections}
        keyExtractor={(item) => item.date}
        renderItem={renderSection}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  fondo: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    zIndex: -1,
    opacity: 0.1,
  },
  title: {
    fontFamily: "PoppinsBold",
    letterSpacing: 1,
    textAlign: "center",
    fontSize: 14,
    marginTop: 20,
  },
  textDate: {
    fontFamily: "PoppinsRegular",
    letterSpacing: 1,
    fontSize: 12,
    marginTop: 20,
    paddingLeft: 20,
  },
});
