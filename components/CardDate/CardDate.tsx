import {
  CardData,
  HistoryData,
} from "@/infrastructure/interfaces/history.response";
import { Text, StyleSheet, View } from "react-native";
import CardHistory from "../CardHistory/CardHistory";
import { formatDate } from "@/presentation/helpers/transform-data";

interface Props {
  item: HistoryData;
}

const CardDate = ({ item }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.dateHeader}>
        <View style={styles.dateBadge}>
          <Text style={styles.textDate}>{formatDate(item.date)}</Text>
        </View>
        <View style={styles.divider} />
      </View>

      <View style={styles.cardsContainer}>
        {item.data.map((data: CardData) => (
          <CardHistory data={data} fecha={item.date} key={data.id} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  dateHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dateBadge: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  textDate: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 13,
    color: "#475569",
    letterSpacing: 0.3,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#e2e8f0",
    marginLeft: 12,
  },
  cardsContainer: {
    gap: 8,
  },
});

export default CardDate;
