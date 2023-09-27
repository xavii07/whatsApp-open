import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Open up .tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25d366",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
});

export default App;
