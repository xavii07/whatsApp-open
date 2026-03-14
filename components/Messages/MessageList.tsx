import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import MessageCard from "./MessageCard";
import MessageEmptyState from "./MessageEmptyState";
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
        <MessageEmptyState
          icon={emptyIcon}
          title={emptyTitle}
          subtitle={emptySubtitle}
        />
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
});

export default MessageList;
