import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  LayoutAnimation,
  UIManager,
} from "react-native";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface AppInfoModalProps {
  visible: boolean;
  onClose: () => void;
  accentColor?: string;
}

export default function AppInfoModal({
  visible,
  onClose,
  accentColor = "#2f9a67",
}: AppInfoModalProps) {
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
        <View style={[styles.container, { borderColor: accentColor }]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.headerBack}>
              <Text style={styles.backChevron}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.title}>MensaLink</Text>
          </View>

          <ScrollView
            style={styles.body}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <Text style={styles.lead}>
              Abre chats en <Text style={{ fontWeight: "700" }}>WhatsApp</Text>,{" "}
              <Text style={{ fontWeight: "700" }}>WhatsApp Business</Text> o{" "}
              <Text style={{ fontWeight: "700" }}>Telegram</Text> sin guardar el
              número. ¡Rápido y fácil!
            </Text>

            <Accordion
              title="Privacidad y seguridad"
              open={openSection === "privacy"}
              onToggle={() => toggle("privacy")}
              accentColor={accentColor}
            >
              <FeatureItem text="No recolectamos ni compartimos datos personales." />
              <FeatureItem text="Todo se guarda localmente en tu dispositivo (historial, favoritos, nombres)." />
              <FeatureItem text="No enviamos información a servidores externos." />
              <FeatureItem text="Sólo usamos las APIs públicas para abrir chats." />
            </Accordion>

            <Accordion
              title="Cómo funciona"
              open={openSection === "how"}
              onToggle={() => toggle("how")}
              accentColor={accentColor}
            >
              <FeatureItem text="Selecciona el país o deja la detección automática." />
              <FeatureItem text="Ingresa el número de teléfono (solo dígitos 0–9)." />
              <FeatureItem text="Escribe un mensaje, selecciona uno predefinido o abre sin mensaje." />
              <FeatureItem text="Elige la app: WhatsApp / WhatsApp Business / Telegram." />

              <Text style={[styles.small, { marginTop: 8 }]}>
                Ejemplo: para Ecuador (+593) escribe{" "}
                <Text style={{ fontWeight: "700" }}>0956324511</Text>
              </Text>
            </Accordion>

            <Accordion
              title="Funciones principales"
              open={openSection === "features"}
              onToggle={() => toggle("features")}
              accentColor={accentColor}
            >
              <View style={{ marginBottom: 6 }}>
                <FeatureItem text="Lista completa de países y detección automática" />
                <FeatureItem text="Enviar por WhatsApp / WhatsApp Business / Telegram" />
                <FeatureItem text="Mensajes predefinidos, editar y guardar como favoritos" />
                <FeatureItem text="Seleccionar un mensaje aleatorio de la lista" />
                <FeatureItem text="Historial local con opción de asignar nombre" />
                <FeatureItem text="Borrar historial y favoritos" />
              </View>
            </Accordion>

            <Accordion
              title="Próximamente"
              open={openSection === "coming"}
              onToggle={() => toggle("coming")}
              accentColor={accentColor}
            >
              <FeatureItem text="Generación de mensajes con IA" />
              <FeatureItem text="Más plantillas inteligentes según el contexto" />
              <FeatureItem text="Opciones de exportar historial en CSV" />
            </Accordion>

            <View style={styles.noteBox}>
              <Text style={styles.noteTitle}>Importante</Text>
              <Text style={styles.noteText}>
                Esta app{" "}
                <Text style={{ fontWeight: "700" }}>no es oficial</Text> de
                WhatsApp o Telegram. Solo construye enlaces para abrir chats. No
                crea ni sincroniza contactos en tu teléfono.
              </Text>
            </View>

            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.btn, { borderColor: accentColor }]}
                onPress={() => {
                  onClose();
                }}
              >
                <Text style={[styles.btnText, { color: accentColor }]}>
                  Cerrar
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
  accentColor: string;
}

function Accordion({
  title,
  children,
  open,
  onToggle,
  accentColor,
}: AccordionProps) {
  return (
    <View style={styles.accordion}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onToggle}
        style={styles.accordionHeader}
      >
        <Text style={styles.accordionTitle}>{title}</Text>
        <View style={[styles.chev, { borderColor: accentColor }]}>
          <Text style={{ color: accentColor }}>{open ? "▲" : "▼"}</Text>
        </View>
      </TouchableOpacity>
      {open ? <View style={styles.accordionBody}>{children}</View> : null}
    </View>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <View style={styles.featureRow}>
      <View style={styles.bullet} />
      <Text style={styles.featureText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.568)",
    justifyContent: "center",
    padding: 16,
  },
  container: {
    backgroundColor: "#075e54bb",
    borderRadius: 14,
    borderWidth: 2,
    maxHeight: "85%",
    overflow: "hidden",
  },
  header: {
    backgroundColor: "transparent",
    paddingVertical: 14,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerBack: {
    width: 40,
  },
  backChevron: {
    fontSize: 22,
    color: "#fff",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  body: {
    paddingHorizontal: 14,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },
  lead: {
    color: "#000",
    fontSize: 14,
    marginBottom: 12,
  },
  paragraph: {
    color: "#000",
    fontSize: 13,
    lineHeight: 20,
  },
  small: {
    color: "#000",
    fontSize: 12,
  },
  accordion: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  accordionHeader: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: "rgba(255,255,255,0.03)",
    borderBottomWidth: 1,
  },
  accordionTitle: {
    color: "#dff3e9",
    fontWeight: "700",
    fontSize: 14,
  },
  chev: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  accordionBody: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    backgroundColor: "transparent",
  },
  noteBox: {
    backgroundColor: "rgba(255,255,255,0.03)",
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
  },
  noteTitle: {
    color: "#000",
    fontWeight: "800",
    marginBottom: 6,
  },
  noteText: {
    color: "#000",
    fontSize: 13,
    lineHeight: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },
  btn: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "transparent",
  },
  btnText: {
    fontWeight: "700",
  },
  btnFilled: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
    marginLeft: 8,
  },
  btnTextFilled: {
    color: "#fff",
    fontWeight: "700",
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#7fd4a6",
    marginRight: 10,
  },
  featureText: {
    color: "#d6eade",
    fontSize: 13,
    flex: 1,
  },
});
