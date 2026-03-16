import {
  StyleSheet,
  Image,
  Pressable,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import * as Clipboard from "expo-clipboard";
import { AdEventType, InterstitialAd } from "react-native-google-mobile-ads";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { COLOR_PRIMARY, COLOR_BLANCO } from "@/config/data/consts";
import { AD_UNIT_IDS, SHOULD_RENDER_ADS } from "@/config/ads";
import Header from "@/components/Header";
import MessageComposer from "@/components/Messages/MessageComposer";
import MessageList from "@/components/Messages/MessageList";
import MessageSectionsList from "@/components/Messages/MessageSectionsList";
import MessageTabs from "@/components/Messages/MessageTabs";
import ModalPicker from "@/components/Home/ModalPicker";
import { DisplayMessage, MensajesTab } from "@/components/Messages/types";
import { MESSAGE_TABS } from "@/components/Messages/constants";
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
  const [modalCategoria, setModalCategoria] = useState(false);
  const [mensajePendienteCategoria, setMensajePendienteCategoria] =
    useState<DisplayMessage | null>(null);
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);
  const interstitialShowCountRef = React.useRef(0);
  const interstitialRef = React.useRef<InterstitialAd | null>(null);
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

  useEffect(() => {
    if (!SHOULD_RENDER_ADS) return;

    const interstitial = InterstitialAd.createForAdRequest(
      AD_UNIT_IDS.INTERSTITIAL,
      {
        requestNonPersonalizedAdsOnly: true,
      },
    );

    interstitialRef.current = interstitial;

    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => setInterstitialLoaded(true),
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setInterstitialLoaded(false);
        interstitial.load();
      },
    );

    const unsubscribeError = interstitial.addAdEventListener(
      AdEventType.ERROR,
      () => setInterstitialLoaded(false),
    );

    interstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      unsubscribeError();
      interstitialRef.current = null;
    };
  }, []);

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
      setInstruccion("");

      setMensajesGenerados(generatedMessages);

      interstitialShowCountRef.current += 1;
      const shouldShowInterstitial = interstitialShowCountRef.current % 3 === 0;

      if (shouldShowInterstitial && interstitialLoaded) {
        await interstitialRef.current?.show();
      }
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
  }, [instruccion, favoritos.mensajes, interstitialLoaded]);

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

  const guardarEnCategoria = useCallback((mensaje: DisplayMessage) => {
    setMensajePendienteCategoria(mensaje);
    setModalCategoria(true);
  }, []);

  const resetearMensajesGenerados = useCallback(() => {
    Alert.alert(
      "Borrar resultados",
      "Se eliminarán todos los mensajes generados y se limpiará la instrucción.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Borrar todo",
          style: "destructive",
          onPress: () => {
            setMensajesGenerados([]);
            setInstruccion("");
            setMensajePendienteCategoria(null);
            setModalCategoria(false);
          },
        },
      ],
    );
  }, []);

  const handleSeleccionarCategoria = useCallback(
    async (categoria: string) => {
      if (!mensajePendienteCategoria) return;
      setModalCategoria(false);
      await addMessageToCategory(categoria, mensajePendienteCategoria.texto);
      Alert.alert("Guardado", `Mensaje agregado a ${categoria}`);
      setMensajePendienteCategoria(null);
    },
    [mensajePendienteCategoria, addMessageToCategory],
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
                <View style={styles.resultadosHeader}>
                  <Text style={styles.resultadosTitle}>
                    Mensajes generados:
                  </Text>

                  <Pressable
                    onPress={resetearMensajesGenerados}
                    style={({ pressed }) => [
                      styles.resetButton,
                      { opacity: pressed ? 0.7 : 1 },
                    ]}
                  >
                    <Text style={styles.resetButtonText}>Borrar todo</Text>
                  </Pressable>
                </View>
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

      <ModalPicker
        isModalVisible={modalCategoria}
        text="Guardar en categoría"
        onModalClose={() => setModalCategoria(false)}
      >
        <View style={styles.modalCategorias}>
          {categoriasDisponibles.map((categoria) => (
            <Pressable
              key={categoria}
              onPress={() => handleSeleccionarCategoria(categoria)}
              style={({ pressed }) => [
                styles.modalCategoriaItem,
                { opacity: pressed ? 0.6 : 1 },
              ]}
            >
              <Text style={styles.modalCategoriaText}>{categoria}</Text>
            </Pressable>
          ))}
        </View>
      </ModalPicker>
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
  resultadosHeader: {
    marginHorizontal: 20,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  resultadosTitle: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
    color: COLOR_BLANCO,
  },
  resetButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  resetButtonText: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 12,
    color: COLOR_BLANCO,
  },
  generatedListContent: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  modalCategorias: {
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 8,
  },
  modalCategoriaItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  modalCategoriaText: {
    fontFamily: "PoppinsRegular",
    fontSize: 13,
    color: "#fff",
  },
});
