import CardDate from "@/components/CardDate/CardDate";
import Header from "@/components/Header";
import { HistoryData } from "@/infrastructure/interfaces/history.response";
import { useHistory } from "@/presentation/store/useHistory";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const { top } = useSafeAreaInsets();
  const { history } = useHistory();

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
        renderItem={({ item }) => <CardDate item={item} />}
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
});
