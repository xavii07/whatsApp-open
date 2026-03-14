import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLOR_BLANCO, COLOR_SECONDARY_ACCENT } from "@/config/data/consts";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

interface MessageEmptyStateProps {
  icon: IconName;
  title: string;
  subtitle: string;
}

const MessageEmptyState = ({
  icon,
  title,
  subtitle,
}: MessageEmptyStateProps) => {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name={icon} size={64} color="#ccc" />
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptySubtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR_SECONDARY_ACCENT,
    padding: 10,
    borderRadius: 10,
  },
  emptyTitle: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
    color: COLOR_BLANCO,
    marginTop: 10,
  },
  emptySubtitle: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    color: "#ccc",
    textAlign: "center",
    lineHeight: 20,
    marginHorizontal: 20,
  },
});

export default MessageEmptyState;
