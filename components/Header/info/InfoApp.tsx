import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
} from "react-native";
import Accordion from "./Accordion";
import FeatureItem from "./FeatureItem";

interface Props {
  visible: boolean;
  onClose: () => void;
  accentColor?: string;
}

export default function AppInfoModal({
  visible,
  onClose,
  accentColor = "#2f9a67",
}: Props) {
  const [openSection, setOpenSection] = useState<
    "privacy" | "how" | "features" | "coming" | null
  >(null);

  const toggle = (key: "privacy" | "how" | "features" | "coming") => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenSection((prev) => (prev === key ? null : key));
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <View style={[styles.header, { backgroundColor: "#075e54" }]}>
            <TouchableOpacity onPress={onClose} style={styles.headerBack}>
              <Text style={styles.backChevron}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.title}>MensaLink</Text>
            <View style={styles.headerSpacer} />
          </View>

          <ScrollView
            style={styles.body}
            contentContainerStyle={{ paddingBottom: 24 }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.lead}>
              Abre chats en <Text style={styles.bold}>WhatsApp</Text>,{" "}
              <Text style={styles.bold}>WhatsApp Business</Text> o{" "}
              <Text style={styles.bold}>Telegram</Text> sin guardar el número en
              tus contactos. ¡Rápido y fácil!
            </Text>

            <Accordion
              title="🔒 Privacidad y seguridad"
              open={openSection === "privacy"}
              onToggle={() => toggle("privacy")}
              accentColor={accentColor}
            >
              <FeatureItem
                text="No recolectamos ni compartimos datos personales."
                accentColor={accentColor}
              />
              <FeatureItem
                text="Todo se guarda localmente en tu dispositivo (historial, favoritos, nombres)."
                accentColor={accentColor}
              />
              <FeatureItem
                text="No enviamos información a servidores externos."
                accentColor={accentColor}
              />
              <FeatureItem
                text="Sólo usamos las APIs públicas para abrir chats."
                accentColor={accentColor}
              />
            </Accordion>

            <Accordion
              title="⚙️ Cómo funciona"
              open={openSection === "how"}
              onToggle={() => toggle("how")}
              accentColor={accentColor}
            >
              <FeatureItem
                text="Selecciona el país o deja la detección automática."
                accentColor={accentColor}
              />
              <FeatureItem
                text="Ingresa el número de teléfono (solo dígitos 0–9)."
                accentColor={accentColor}
              />
              <FeatureItem
                text="Escribe un mensaje, selecciona uno predefinido o abre sin mensaje."
                accentColor={accentColor}
              />
              <FeatureItem
                text="Elige la app: WhatsApp / WhatsApp Business / Telegram."
                accentColor={accentColor}
              />

              <View
                style={[styles.exampleBox, { borderLeftColor: accentColor }]}
              >
                <Text style={styles.exampleLabel}>Ejemplo:</Text>
                <Text style={styles.exampleText}>
                  Para Ecuador (+593) escribe{" "}
                  <Text style={[styles.exampleNumber, { color: accentColor }]}>
                    0956324511
                  </Text>
                </Text>
              </View>
            </Accordion>

            <Accordion
              title="✨ Funciones principales"
              open={openSection === "features"}
              onToggle={() => toggle("features")}
              accentColor={accentColor}
            >
              <FeatureItem
                text="Lista completa de países y detección automática"
                accentColor={accentColor}
              />
              <FeatureItem
                text="Enviar por WhatsApp / WhatsApp Business / Telegram"
                accentColor={accentColor}
              />
              <FeatureItem
                text="Mensajes predefinidos, editar y guardar como favoritos"
                accentColor={accentColor}
              />
              <FeatureItem
                text="Seleccionar un mensaje aleatorio de la lista"
                accentColor={accentColor}
              />
              <FeatureItem
                text="Historial local con opción de asignar nombre"
                accentColor={accentColor}
              />
              <FeatureItem
                text="Borrar historial y favoritos"
                accentColor={accentColor}
              />
            </Accordion>

            <Accordion
              title="🚀 Próximamente"
              open={openSection === "coming"}
              onToggle={() => toggle("coming")}
              accentColor={accentColor}
            >
              <FeatureItem
                text="Generación de mensajes con IA"
                accentColor={accentColor}
              />
              <FeatureItem
                text="Más plantillas inteligentes según el contexto"
                accentColor={accentColor}
              />
              <FeatureItem
                text="Opciones de exportar historial en CSV"
                accentColor={accentColor}
              />
            </Accordion>

            <View
              style={[styles.noteBox, { backgroundColor: `${accentColor}10` }]}
            >
              <Text style={styles.noteText}>
                Esta app <Text style={styles.bold}>no es oficial</Text> de
                WhatsApp o Telegram. Solo construye enlaces para abrir chats. No
                crea ni sincroniza contactos en tu teléfono.
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.btn, { backgroundColor: "#075e54" }]}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>Cerrar</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    padding: 20,
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    maxHeight: "90%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerBack: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerSpacer: {
    width: 40,
  },
  backChevron: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "300",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  lead: {
    fontFamily: "PoppinsRegular",
    color: "#333",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
    textAlign: "center",
  },
  bold: {
    fontWeight: "700",
    color: "#1a1a1a",
  },

  noteBox: {
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },

  noteText: {
    color: "#495057",
    fontFamily: "PoppinsRegular",
    fontSize: 12,
    lineHeight: 20,
  },
  btn: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  exampleBox: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    borderLeftWidth: 3,
  },
  exampleLabel: {
    fontSize: 12,
    color: "#6c757d",
    fontWeight: "600",
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 14,
    color: "#495057",
    lineHeight: 20,
  },
  exampleNumber: {
    fontWeight: "700",
    fontSize: 15,
  },
});
