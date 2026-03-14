import { SectionList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  COLOR_BLANCO,
  COLOR_PRIMARY,
  COLOR_SECONDARY_ACCENT,
} from "@/config/data/consts";
import MessageCard from "./MessageCard";
import { DisplayMessage } from "./types";

interface MessageSection {
  title: string;
  subtitle?: string;
  data: DisplayMessage[];
}

interface MessageSectionsListProps {
  sections: MessageSection[];
  onCopy: (texto: string) => void;
  onFavoriteAction?: (message: DisplayMessage) => void;
  contentBottomPadding?: number;
}

const MessageSectionsList = ({
  sections,
  onCopy,
  onFavoriteAction,
  contentBottomPadding = 80,
}: MessageSectionsListProps) => {
  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MessageCard
          message={item}
          onCopy={onCopy}
          onFavoriteAction={onFavoriteAction}
        />
      )}
      renderSectionHeader={({ section }) => (
        <View style={styles.sectionHeader}>
          <View style={styles.titleRow}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{section.data.length}</Text>
            </View>
          </View>
        </View>
      )}
      stickySectionHeadersEnabled={false}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Ionicons name="chatbubble-ellipses-outline" size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>Sin mensajes</Text>
          <Text style={styles.emptySubtitle}>
            No hay mensajes cargados en el store todavía.
          </Text>
        </View>
      }
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: contentBottomPadding },
        sections.length === 0 && styles.emptyContentContainer,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  emptyContentContainer: {
    flexGrow: 1,
  },
  sectionHeader: {
    backgroundColor: COLOR_SECONDARY_ACCENT,
    borderColor: COLOR_BLANCO,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  sectionTitle: {
    flex: 1,
    fontFamily: "PoppinsSemiBold",
    fontSize: 13,
    color: COLOR_BLANCO,
  },
  countBadge: {
    backgroundColor: "rgba(255,255,255,0.99)",
    borderRadius: 999,
    minWidth: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  countText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 12,
    color: COLOR_PRIMARY,
  },
  itemSeparator: {
    height: 10,
  },
  sectionSeparator: {
    height: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -40,
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

export default MessageSectionsList;
