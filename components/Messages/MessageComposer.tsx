import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  COLOR_BLANCO,
  COLOR_SECONDARY,
  COLOR_SECONDARY_ACCENT,
} from "@/config/data/consts";

interface MessageComposerProps {
  value: string;
  onChangeText: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

const MessageComposer = ({
  value,
  onChangeText,
  onSubmit,
  loading,
}: MessageComposerProps) => {
  const isDisabled = loading || value.trim().length === 0;

  return (
    <>
      <View style={styles.infoCard}>
        <Text style={styles.label}>Genera mensajes con IA</Text>
        <Text style={styles.subtitle}>
          Describe lo que necesitas y te ayudaré a redactarlo
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ej: Quiero solicitar un reembolso a una empresa que me vendio un producto defectuoso"
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          editable={!loading}
          multiline
        />
      </View>

      <Pressable
        onPress={onSubmit}
        disabled={isDisabled}
        style={({ pressed }) => [
          styles.button,
          {
            opacity: pressed && !isDisabled ? 0.8 : 1,
          },
          isDisabled && styles.buttonDisabled,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={COLOR_BLANCO} />
        ) : (
          <>
            <Ionicons name="sparkles-outline" size={20} color={COLOR_BLANCO} />
            <Text style={styles.buttonText}>Generar mensaje</Text>
          </>
        )}
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    marginTop: 14,
    backgroundColor: COLOR_SECONDARY_ACCENT,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderColor: COLOR_BLANCO,
    borderWidth: 1,
  },
  label: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    color: COLOR_BLANCO,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    color: "#ddd",
    textAlign: "center",
  },
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 12,
  },
  input: {
    backgroundColor: COLOR_BLANCO,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    color: "#1e293b",
    maxHeight: 100,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: COLOR_SECONDARY,
    borderRadius: 10,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
    color: COLOR_BLANCO,
  },
});

export default MessageComposer;
