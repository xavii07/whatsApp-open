import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as Clipboard from "expo-clipboard";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { COLOR_PRIMARY, COLOR_BLANCO } from "@/config/data/consts";
import Header from "@/components/Header";
import MessageComposer from "@/components/Messages/MessageComposer";
import MessageList from "@/components/Messages/MessageList";
import MessageSectionsList from "@/components/Messages/MessageSectionsList";
import MessageTabs from "@/components/Messages/MessageTabs";
import { DisplayMessage, MensajesTab } from "@/components/Messages/types";
import {
  FAVORITOS_CATEGORIA,
  MESSAGE_TABS,
} from "@/components/Messages/constants";
import { generateMessageSuggestions } from "@/presentation/helpers/generate-message-suggestions";
import {
  buildMensajesDisponibles,
  buildMensajesFavoritos,
  buildSeccionesMensajes,
  getCategoriasDisponibles,
  syncGeneratedFavorites,
} from "@/presentation/helpers/messages-transformers";
import { useMessagesStore } from "@/presentation/store/useMessages";

const MensajesScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const [instruccion, setInstruccion] = useState("");
  const [mensajesGenerados, setMensajesGenerados] = useState<DisplayMessage[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [mostrarTab, setMostrarTab] = useState<MensajesTab>("generar");
  const {
    favoritos,
    messages,
    getMessagesFavoritos,
    addFavorito,
    deleteFavorito,
    addMessageToCategory,
  } = useMessagesStore();

  useEffect(() => {
    getMessagesFavoritos();
  }, [getMessagesFavoritos]);

  useEffect(() => {
    setMensajesGenerados((currentMessages) =>
      syncGeneratedFavorites(currentMessages, favoritos.mensajes),
    );
  }, [favoritos.mensajes]);

  const mensajesDisponibles = useMemo<DisplayMessage[]>(() => {
    return buildMensajesDisponibles(messages, favoritos.mensajes);
  }, [messages, favoritos.mensajes]);

  const seccionesMensajes = useMemo(
    () => buildSeccionesMensajes(mensajesDisponibles),
    [mensajesDisponibles],
  );

  const mensajesFavoritos = useMemo(
    () => buildMensajesFavoritos(favoritos.mensajes),
    [favoritos.mensajes],
  );

  const categoriasDisponibles = useMemo(
    () => getCategoriasDisponibles(messages),
    [messages],
  );

  const generarMensajesConIA = useCallback(async () => {
    const trimmedInstruction = instruccion.trim();

    if (trimmedInstruction.length === 0) {
      Alert.alert("Error", "Por favor ingresa una instrucción");
      return;
    }

    setLoading(true);

    try {
      const generatedMessages = await generateMessageSuggestions({
        prompt: trimmedInstruction,
        favoriteMessages: favoritos.mensajes,
      });

      setMensajesGenerados(generatedMessages);
    } catch (error: unknown) {
      const message =
        error instanceof Error &&
        error.message.includes("EXPO_PUBLIC_OPENROUTER_API_KEY")
          ? "Configura EXPO_PUBLIC_OPENROUTER_API_KEY para usar el modelo."
          : "No se pudieron generar los mensajes";

      Alert.alert("Error", message);
    } finally {
      setLoading(false);
    }
  }, [instruccion, favoritos.mensajes]);

  const copiarAlPortapapeles = useCallback(async (texto: string) => {
    try {
      await Clipboard.setStringAsync(texto);
      Alert.alert("Éxito", "Mensaje copiado al portapapeles");
    } catch (error) {
      Alert.alert("Error", "No se pudo copiar el mensaje");
    }
  }, []);

  const toggleFavorito = useCallback(
    async (mensaje: DisplayMessage) => {
      if (mensaje.esFavorito) {
        await deleteFavorito(mensaje.texto);
      } else {
        await addFavorito(mensaje.texto);
      }

      setMensajesGenerados((currentMessages) =>
        currentMessages.map((item) =>
          item.texto === mensaje.texto
            ? { ...item, esFavorito: !mensaje.esFavorito }
            : item,
        ),
      );
    },
    [addFavorito, deleteFavorito],
  );

  const eliminarFavorito = useCallback(
    async (mensaje: DisplayMessage) => {
      await deleteFavorito(mensaje.texto);
    },
    [deleteFavorito],
  );

  const guardarEnCategoria = useCallback(
    (mensaje: DisplayMessage) => {
      const options = categoriasDisponibles.map((categoria) => ({
        text: categoria,
        onPress: async () => {
          await addMessageToCategory(categoria, mensaje.texto);
          Alert.alert("Guardado", `Mensaje agregado a ${categoria}`);
        },
      }));

      Alert.alert("Guardar en categoría", "Selecciona una categoría", [
        ...options,
        { text: "Cancelar", style: "cancel" },
      ]);
    },
    [categoriasDisponibles, addMessageToCategory],
  );

  return (
    <SafeAreaView style={[styles.container]}>
      <Image
        source={require("@/assets/images/fondo.png")}
        style={[styles.fondo, { top }]}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Header>
          <Text style={styles.headerTitle}>Mensajes IA</Text>
        </Header>

        <MessageTabs
          activeTab={mostrarTab}
          onChange={setMostrarTab}
          tabs={MESSAGE_TABS}
        />

        {mostrarTab === "generar" ? (
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: bottom + 20,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <MessageComposer
              value={instruccion}
              onChangeText={setInstruccion}
              onSubmit={generarMensajesConIA}
              loading={loading}
            />

            {mensajesGenerados.length > 0 && (
              <View style={styles.resultadosContainer}>
                <Text style={styles.resultadosTitle}>Mensajes generados:</Text>
                <MessageList
                  data={mensajesGenerados}
                  onCopy={copiarAlPortapapeles}
                  onFavoriteAction={toggleFavorito}
                  onSaveCategoryAction={guardarEnCategoria}
                  showCategory
                  emptyTitle="Sin resultados"
                  emptySubtitle="Cuando generes mensajes aparecerán aquí."
                  emptyIcon="sparkles-outline"
                  scrollEnabled={false}
                  contentContainerStyle={styles.generatedListContent}
                />
              </View>
            )}
          </ScrollView>
        ) : mostrarTab === "todos" ? (
          <MessageSectionsList
            sections={seccionesMensajes}
            onCopy={copiarAlPortapapeles}
            onFavoriteAction={toggleFavorito}
            contentBottomPadding={bottom + 80}
          />
        ) : (
          <MessageList
            data={mensajesFavoritos}
            onCopy={copiarAlPortapapeles}
            onFavoriteAction={eliminarFavorito}
            favoriteAction="delete"
            emptyTitle="Sin favoritos"
            emptySubtitle="Los mensajes que guardes como favoritos aparecerán aquí"
            emptyIcon="star-outline"
            contentContainerStyle={{ paddingBottom: bottom + 80 }}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MensajesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR_PRIMARY,
  },
  fondo: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    zIndex: -1,
    opacity: 0.9,
  },
  headerTitle: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
    color: COLOR_BLANCO,
    letterSpacing: 0.4,
  },
  resultadosContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  resultadosTitle: {
    marginHorizontal: 20,
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
    color: COLOR_BLANCO,
    marginBottom: 12,
  },
  generatedListContent: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});
