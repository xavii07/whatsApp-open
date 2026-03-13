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
import React, { useEffect, useMemo, useState } from "react";
import * as Clipboard from "expo-clipboard";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { COLOR_PRIMARY, COLOR_BLANCO } from "@/config/data/consts";
import Header from "@/components/Header";
import MessageComposer from "@/components/Messages/MessageComposer";
import MessageList from "@/components/Messages/MessageList";
import MessageTabs from "@/components/Messages/MessageTabs";
import { DisplayMessage, MensajesTab } from "@/components/Messages/types";
import { generateMessageSuggestions } from "@/presentation/helpers/generate-message-suggestions";
import { useMessagesStore } from "@/presentation/store/useMessages";

const FAVORITOS_CATEGORIA = "⭐ Favoritos";

const TABS: { key: MensajesTab; label: string }[] = [
  { key: "generar", label: "Generar" },
  { key: "todos", label: "Todos" },
  { key: "favoritos", label: "Favoritos" },
];

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
  } = useMessagesStore();

  useEffect(() => {
    getMessagesFavoritos();
  }, [getMessagesFavoritos]);

  useEffect(() => {
    setMensajesGenerados((currentMessages) =>
      currentMessages.map((message) => ({
        ...message,
        esFavorito: favoritos.mensajes.includes(message.texto),
      })),
    );
  }, [favoritos.mensajes]);

  const mensajesDisponibles = useMemo<DisplayMessage[]>(() => {
    const uniqueMessages = new Map<string, DisplayMessage>();

    messages
      .filter((category) => category.categoria !== FAVORITOS_CATEGORIA)
      .forEach((category) => {
        category.mensajes.forEach((texto, index) => {
          if (!uniqueMessages.has(texto)) {
            uniqueMessages.set(texto, {
              id: `${category.categoria}-${index}-${texto}`,
              texto,
              categoria: category.categoria.trim(),
              esFavorito: favoritos.mensajes.includes(texto),
            });
          }
        });
      });

    return Array.from(uniqueMessages.values());
  }, [messages, favoritos.mensajes]);

  const mensajesFavoritos = useMemo<DisplayMessage[]>(() => {
    return favoritos.mensajes.map((texto, index) => ({
      id: `favorito-${index}-${texto}`,
      texto,
      esFavorito: true,
      categoria: FAVORITOS_CATEGORIA,
    }));
  }, [favoritos.mensajes]);

  const generarMensajesConIA = async () => {
    if (instruccion.trim().length === 0) {
      Alert.alert("Error", "Por favor ingresa una instrucción");
      return;
    }

    setLoading(true);

    try {
      const generatedMessages = await generateMessageSuggestions({
        prompt: instruccion,
        categories: messages,
        favoriteMessages: favoritos.mensajes,
      });

      setMensajesGenerados(generatedMessages);
    } catch (error) {
      Alert.alert("Error", "No se pudieron generar los mensajes");
    } finally {
      setLoading(false);
    }
  };

  const copiarAlPortapapeles = async (texto: string) => {
    try {
      await Clipboard.setStringAsync(texto);
      Alert.alert("Éxito", "Mensaje copiado al portapapeles");
    } catch (error) {
      Alert.alert("Error", "No se pudo copiar el mensaje");
    }
  };

  const toggleFavorito = async (mensaje: DisplayMessage) => {
    if (mensaje.esFavorito) {
      await deleteFavorito(mensaje.texto);
    } else {
      await addFavorito(mensaje.texto);
    }
  };

  const eliminarFavorito = async (mensaje: DisplayMessage) => {
    await deleteFavorito(mensaje.texto);
  };

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
          tabs={TABS}
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
          <MessageList
            data={mensajesDisponibles}
            onCopy={copiarAlPortapapeles}
            onFavoriteAction={toggleFavorito}
            showCategory
            emptyTitle="Sin mensajes"
            emptySubtitle="No hay mensajes cargados en el store todavía."
            emptyIcon="chatbubble-ellipses-outline"
            contentContainerStyle={{ paddingBottom: bottom + 80 }}
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
