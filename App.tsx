import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import FormComponent from "./src/components/Form";

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={{ flex: 1, backgroundColor: "#546" }}>Formulário</Text>
      <FormComponent />
      <Text style={{ flex: 1 }}>Formulário</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#075e54",
    paddingHorizontal: 20,
  },
});

export default App;
