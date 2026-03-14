import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { PropsWithChildren } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLOR_BLANCO } from "@/config/data/consts";

type Props = PropsWithChildren<{
  isModalVisible: boolean;
  text: string;
  onModalClose: () => void;
  position?: "bottom" | "top";
}>;

export default function ModalPicker({
  isModalVisible,
  text,
  children,
  onModalClose,
  position = "bottom",
}: Props) {
  const { bottom, top } = useSafeAreaInsets();
  const isTop = position === "top";

  return (
    <Modal animationType="slide" transparent={true} visible={isModalVisible}>
      <View
        style={[
          styles.modalOverlay,
          isTop ? styles.modalOverlayTop : styles.modalOverlayBottom,
        ]}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
          style={[
            styles.keyboardAvoidingView,
            isTop
              ? styles.keyboardAvoidingViewTop
              : styles.keyboardAvoidingViewBottom,
          ]}
        >
          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              isTop ? styles.scrollContentTop : styles.scrollContentBottom,
            ]}
            scrollEnabled
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={[
                styles.modalContent,
                isTop ? styles.modalContentTop : styles.modalContentBottom,
                { paddingBottom: isTop ? 14 : bottom + 14 },
                isTop && { paddingTop: top },
              ]}
            >
              <View
                style={[
                  styles.titleContainer,
                  isTop && styles.titleContainerTop,
                ]}
              >
                <Text style={styles.title}>{text}</Text>
                <Pressable
                  onPress={onModalClose}
                  style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
                >
                  <MaterialIcons name="close" color={COLOR_BLANCO} size={20} />
                </Pressable>
              </View>

              <View style={styles.bodyContainer}>{children}</View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalOverlayBottom: {
    justifyContent: "flex-end",
  },
  modalOverlayTop: {
    justifyContent: "flex-start",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  keyboardAvoidingViewBottom: {
    justifyContent: "flex-end",
  },
  keyboardAvoidingViewTop: {
    justifyContent: "flex-start",
  },
  scrollContent: {
    flexGrow: 1,
  },
  scrollContentBottom: {
    justifyContent: "flex-end",
  },
  scrollContentTop: {
    justifyContent: "flex-start",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#25292e",
  },
  modalContentBottom: {
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  modalContentTop: {
    borderBottomRightRadius: 18,
    borderBottomLeftRadius: 18,
  },
  titleContainer: {
    backgroundColor: "#464C55",
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  titleContainerTop: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  bodyContainer: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  title: {
    color: COLOR_BLANCO,
    fontSize: 13,
    fontFamily: "PoppinsRegular",
  },
});
