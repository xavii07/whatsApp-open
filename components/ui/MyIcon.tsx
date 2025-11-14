import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

interface Props {
  name: keyof typeof Ionicons.glyphMap;
  color?: string;
  size?: number;
  onPress?: () => void;
}

const MyIcon = ({ color = "#322783", name, size = 20, onPress }: Props) => {
  return <Ionicons name={name} size={size} color={color} onPress={onPress} />;
};

export default MyIcon;
