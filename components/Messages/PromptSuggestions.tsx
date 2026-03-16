import React, { useMemo } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { PROMPT_SUGGESTIONS } from "./prompt-suggestions.constants";

interface PromptSuggestionsProps {
  onSelectPrompt: (prompt: string) => void;
}

const { width } = Dimensions.get("window");
const isSmallScreen = width < 375;

const getCardWidthByWords = (message: string) => {
  const charsCount = message.trim().length;
  const base = isSmallScreen ? 120 : 140;
  const widthByChars = base + charsCount * 2;

  return Math.max(base, widthByChars);
};

const PromptSuggestions = ({ onSelectPrompt }: PromptSuggestionsProps) => {
  const promptRows = useMemo(() => {
    const rows = 2;
    const groupedRows: Array<Array<(typeof PROMPT_SUGGESTIONS)[number]>> =
      Array.from({ length: rows }, () => []);

    PROMPT_SUGGESTIONS.forEach((prompt, index) => {
      const rowIndex = index % rows;
      groupedRows[rowIndex].push(prompt);
    });

    return groupedRows;
  }, []);

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.content}
        decelerationRate="fast"
      >
        <View style={styles.rowsContainer}>
          {promptRows.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((item, index) => (
                <Pressable
                  key={`${item.label}-${index}`}
                  onPress={() => onSelectPrompt(item.prompt)}
                  style={({ pressed }) => [
                    styles.bentoCard,
                    { width: getCardWidthByWords(item.label) },
                    { opacity: pressed ? 0.8 : 1 },
                  ]}
                >
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="clip"
                    style={styles.bentoText}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 8,
  },
  content: {
    paddingVertical: 4,
    paddingRight: 8,
  },
  rowsContainer: {
    gap: 4,
  },
  row: {
    flexDirection: "row",
    gap: 6,
    alignItems: "flex-start",
  },
  bentoCard: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    paddingVertical: 6,
    paddingHorizontal: 8,
    justifyContent: "center",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    flexShrink: 0,
  },
  bentoText: {
    fontSize: 12,
    fontFamily: "PoppinsRegular",
    color: "#1e293b",
    lineHeight: 14,
  },
});

export default PromptSuggestions;
