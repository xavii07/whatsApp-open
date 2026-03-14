import { COLOR_BLANCO } from "@/config/data/consts";

type FavoriteAction = "toggle" | "delete";

export const getFavoriteVisuals = (
  favoriteAction: FavoriteAction,
  isFavorite: boolean,
) => {
  if (favoriteAction === "delete") {
    return {
      icon: "trash-bin" as const,
      color: "#ef4444",
    };
  }

  return {
    icon: isFavorite ? "star" : "star-outline",
    color: isFavorite ? "#f0e925ff" : COLOR_BLANCO,
  };
};
