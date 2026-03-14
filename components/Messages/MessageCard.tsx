import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  COLOR_BLANCO,
  COLOR_PRIMARY,
  COLOR_SECONDARY,
} from "@/config/data/consts";
import { DisplayMessage } from "./types";
import { getFavoriteVisuals } from "./message-card.utils";

type FavoriteAction = "toggle" | "delete";

interface MessageCardProps {
  message: DisplayMessage;
  onCopy: (texto: string) => void;
  onFavoriteAction?: (message: DisplayMessage) => void;
  onSaveCategoryAction?: (message: DisplayMessage) => void;
  favoriteAction?: FavoriteAction;
  showCategory?: boolean;
}

const MessageCard = ({
  message,
  onCopy,
  onFavoriteAction,
  onSaveCategoryAction,
  favoriteAction = "toggle",
  showCategory = false,
}: MessageCardProps) => {
  const { icon: favoriteIcon, color: favoriteColor } = getFavoriteVisuals(
    favoriteAction,
    message.esFavorito,
  );

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        {showCategory && !!message.categoria && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{message.categoria}</Text>
          </View>
        )}

        <Text style={styles.messageText}>{message.texto}</Text>
      </View>

      <View style={styles.actions}>
        {onFavoriteAction && (
          <Pressable
            onPress={() => onFavoriteAction(message)}
            style={({ pressed }) => [
              styles.actionButton,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <Ionicons name={favoriteIcon} size={18} color={favoriteColor} />
          </Pressable>
        )}

        {onSaveCategoryAction && (
          <Pressable
            onPress={() => onSaveCategoryAction(message)}
            style={({ pressed }) => [
              styles.actionButton,
              { opacity: pressed ? 0.6 : 1 },
            ]}
          >
            <Ionicons name="bookmark-outline" size={18} color={COLOR_BLANCO} />
          </Pressable>
        )}

        <Pressable
          onPress={() => onCopy(message.texto)}
          style={({ pressed }) => [
            styles.actionButton,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <Ionicons name="copy" size={18} color={COLOR_BLANCO} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLOR_BLANCO,
    borderRadius: 10,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  content: {
    flex: 1,
    marginRight: 10,
    gap: 8,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryText: {
    fontFamily: "PoppinsRegular",
    fontSize: 11,
    color: COLOR_PRIMARY,
  },
  messageText: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    color: COLOR_SECONDARY,
    lineHeight: 15,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 25,
    height: 25,
    borderRadius: 8,
    backgroundColor: COLOR_SECONDARY,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MessageCard;
