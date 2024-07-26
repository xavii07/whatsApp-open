import Footer from "@/components/Footer";
import FormComponent from "@/components/Form";
import Header from "@/components/Header";
import { getCountry } from "@/config/data/getContry";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const country = getCountry();
  console.log({ country });
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: top }]}>
      <Header />
      <FormComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#075e54",
  },
});
