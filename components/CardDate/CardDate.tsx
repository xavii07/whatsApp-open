import {
  CardData,
  HistoryData,
} from "@/infrastructure/interfaces/history.response";
import { Text, StyleSheet } from "react-native";
import CardHistory from "../CardHistory/CardHistory";
import { formatDate } from "@/presentation/helpers/transform-data";

interface Props {
  item: HistoryData;
}

const CardDate = ({ item }: Props) => {
  return (
    <>
      <Text style={styles.textDate}>{formatDate(item.date)}</Text>
      {item.data.map((data: CardData) => (
        <CardHistory data={data} fecha={item.date} key={data.id} />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  textDate: {
    fontFamily: "PoppinsRegular",
    letterSpacing: 1,
    fontSize: 12,
    marginTop: 20,
    paddingLeft: 20,
  },
});

export default CardDate;
