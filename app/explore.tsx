import CardDate from "@/components/CardDate/CardDate";
import Header from "@/components/Header";
import { HistoryData } from "@/infrastructure/interfaces/history.response";
import { useHistory } from "@/presentation/store/useHistory";
import { StyleSheet, View, Text, Image, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabTwoScreen() {
  const { top } = useSafeAreaInsets();
  const { history } = useHistory();

  const sections: HistoryData[] = Object.keys(history).map((date) => ({
    date,
    data: history[date] ?? [],
  }));

  const orderSectionsByDate = (a: HistoryData, b: HistoryData) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  };

  sections.sort(orderSectionsByDate);

  const EmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyContainer2}>
        <Ionicons name="time-outline" size={64} color="#ccc" />
        <Text style={styles.emptyTitle}>Sin historial</Text>
        <Text style={styles.emptySubtitle}>
          Tus mensajes enviados aparecerán aquí
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <Image
        source={require("@/assets/images/fondo.png")}
        style={styles.fondo}
      />
      <Header subtitle="Historial" />

      <FlatList
        data={sections}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => <CardDate item={item} />}
        contentContainerStyle={[
          styles.listContent,
          sections.length === 0 && styles.listContentEmpty,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={EmptyComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fondo: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    zIndex: 0,
    opacity: 0.9,
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 8,
    gap: 8,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
    color: "#1e293b",
    letterSpacing: 0.5,
  },
  listContent: {
    paddingBottom: 24,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    marginTop: -40,
  },
  emptyContainer2: {
    alignItems: "center",
    backgroundColor: "#075e54",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyTitle: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
    color: "#fff",
    marginTop: 10,
  },
  emptySubtitle: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    color: "#ccc",
    textAlign: "center",
    lineHeight: 20,
  },
});
