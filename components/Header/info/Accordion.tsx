import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  accentColor: string;
}

const Accordion = ({ title, children, open, onToggle, accentColor }: Props) => {
  return (
    <View style={styles.accordion}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onToggle}
        style={[
          styles.accordionHeader,
          open && { backgroundColor: `${accentColor}08` },
        ]}
      >
        <Text style={styles.accordionTitle}>{title}</Text>
        <View style={[styles.chev, { backgroundColor: `${accentColor}15` }]}>
          <Text style={[styles.chevText, { color: accentColor }]}>
            {open ? "▲" : "▼"}
          </Text>
        </View>
      </TouchableOpacity>
      {open ? <View style={styles.accordionBody}>{children}</View> : null}
    </View>
  );
};

export default Accordion;

const styles = StyleSheet.create({
  accordion: {
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#f8f9fa",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  accordionHeader: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accordionTitle: {
    fontFamily: "PoppinsRegular",
    color: "#1a1a1a",
    fontWeight: "600",
    fontSize: 13,
    flex: 1,
  },
  chev: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  chevText: {
    fontFamily: "PoppinsRegular",
    fontSize: 10,
    fontWeight: "700",
  },
  accordionBody: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
});
