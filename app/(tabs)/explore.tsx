import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { StyleSheet, View, Text } from "react-native";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Header />
      </View>
      <View>
        <Text>skjdfhjk</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
});
