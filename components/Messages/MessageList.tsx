import {
  FlatList,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLOR_BLANCO } from "@/config/data/consts";
import MessageCard from "./MessageCard";
import { DisplayMessage } from "./types";

type FavoriteAction = "toggle" | "delete";
type IconName = React.ComponentProps<typeof Ionicons>["name"];

interface MessageListProps {
  data: DisplayMessage[];
  onCopy: (texto: string) => void;
  onFavoriteAction?: (message: DisplayMessage) => void;
  onSaveCategoryAction?: (message: DisplayMessage) => void;
  favoriteAction?: FavoriteAction;
  showCategory?: boolean;
  emptyTitle: string;
  emptySubtitle: string;
  emptyIcon: IconName;
  contentContainerStyle?: StyleProp<ViewStyle>;
  scrollEnabled?: boolean;
}

const MessageList = ({
  data,
  onCopy,
  onFavoriteAction,
  onSaveCategoryAction,
  favoriteAction = "toggle",
  showCategory = false,
  emptyTitle,
  emptySubtitle,
  emptyIcon,
  contentContainerStyle,
  scrollEnabled = true,
}: MessageListProps) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <MessageCard
          message={item}
          onCopy={onCopy}
          onFavoriteAction={onFavoriteAction}
          onSaveCategoryAction={onSaveCategoryAction}
          favoriteAction={favoriteAction}
          showCategory={showCategory}
        />
      )}
      scrollEnabled={scrollEnabled}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      contentContainerStyle={[
        styles.listContent,
        data.length === 0 && styles.listContentEmpty,
        contentContainerStyle,
      ]}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Ionicons name={emptyIcon} size={64} color="#ccc" />
          <Text style={styles.emptyTitle}>{emptyTitle}</Text>
          <Text style={styles.emptySubtitle}>{emptySubtitle}</Text>
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  separator: {
    height: 10,
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

export default MessageList;
