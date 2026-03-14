import { COLOR_BLANCO } from "@/config/data/consts";
import Ionicons from "@expo/vector-icons/Ionicons";

type FavoriteAction = "toggle" | "delete";

export const getFavoriteVisuals = (
  favoriteAction: FavoriteAction,
  isFavorite: boolean,
): { icon: keyof typeof Ionicons.glyphMap; color: string } => {
  if (favoriteAction === "delete") {
    return {
      icon: "trash-bin",
      color: "#ef4444",
    };
  }

  return {
    icon: isFavorite ? "star" : "star-outline",
    color: isFavorite ? "#f0e925ff" : COLOR_BLANCO,
  };
};
