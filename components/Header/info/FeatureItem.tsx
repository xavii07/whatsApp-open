import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface Props {
  text: string;
  accentColor: string;
}

const FeatureItem = ({ text, accentColor }: Props) => {
  return (
    <View style={styles.featureRow}>
      <View style={[styles.bullet, { backgroundColor: accentColor }]} />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
};

export default FeatureItem;

const styles = StyleSheet.create({
  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 8,
    paddingRight: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    marginRight: 12,
  },
  featureText: {
    fontFamily: "PoppinsRegular",
    color: "#495057",
    fontSize: 12,
    flex: 1,
    lineHeight: 20,
  },
});
