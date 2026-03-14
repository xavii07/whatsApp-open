import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLOR_PRIMARY, COLOR_SECONDARY } from "@/config/data/consts";
import { MensajesTab } from "./types";

interface TabOption {
  key: MensajesTab;
  label: string;
}

interface MessageTabsProps {
  activeTab: MensajesTab;
  onChange: (tab: MensajesTab) => void;
  tabs: TabOption[];
}

const MessageTabs = ({ activeTab, onChange, tabs }: MessageTabsProps) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;

        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={({ pressed }) => [
              styles.tab,
              isActive && styles.tabActive,
              { opacity: pressed ? 0.85 : 1 },
            ]}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: COLOR_SECONDARY,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: "rgba(255,255,255,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  tabText: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    color: "rgba(255,255,255,0.99)",
  },
  tabTextActive: {
    fontFamily: "PoppinsSemiBold",
    color: COLOR_PRIMARY,
  },
});

export default MessageTabs;
