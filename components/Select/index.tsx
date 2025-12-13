import React, { useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { countries, Country } from "@/config/data/countries";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import MyIcon from "../ui/MyIcon";
import useIp from "@/presentation/hooks/useIp";

type SelectProps = {
  onChangeCodigo: (text: string) => void;
};

const SelectComponent: React.FC<SelectProps> = ({ onChangeCodigo }) => {
  const { country, isLoading } = useIp();
  console.log(country);
  console.log(isLoading);

  // Encontrar el país correspondiente
  const selectedCountry = countries.find((c) =>
    c.codigoISO.includes(country ?? "")
  );

  // Establecer índice por defecto
  const defaultIndex = selectedCountry
    ? countries.findIndex((c) => c.codigoISO === selectedCountry.codigoISO)
    : 0;

  useEffect(() => {
    if (selectedCountry) {
      onChangeCodigo(selectedCountry.codigoPais);
    }
  }, [selectedCountry]);

  // Mostrar loading mientras se obtiene el país
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#075e54" />
        <Text style={styles.loadingText}>Detectando país...</Text>
      </View>
    );
  }

  return (
    <SelectDropdown
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.containerSelect}>
            <Text style={styles.textSelect}>
              {selectedItem || (selectedCountry ? selectedCountry.bandera + " " + selectedCountry.codigoISO : "Seleccione un país")}
            </Text>
            <MyIcon name={isOpened ? "chevron-up" : "chevron-down"} />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={[
              styles.containerItem,
              {
                backgroundColor: isSelected ? "#075e54ff" : "#e2faf5",
              },
            ]}
          >
            <Text
              style={[
                styles.itemText,
                {
                  fontFamily: isSelected ? "PoppinsBold" : "PoppinsRegular",
                  color: isSelected ? "#ffffff" : "#000000",
                },
              ]}
            >
              {item}
            </Text>
          </View>
        );
      }}
      data={countries.map(
        (country: Country) =>
          `${country.bandera} ${country.codigoISO} (${country.codigoPais})`
      )}
      defaultValueByIndex={defaultIndex}
      onSelect={(selectedItem) => {
        const codigo = selectedItem.split("(")[1].split(")")[0];
        onChangeCodigo(codigo);
      }}
    />
  );
};

const styles = StyleSheet.create({
  containerSelect: {
    flexDirection: "row",
    height: 30,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textSelect: {
    color: "#000000",
    fontSize: 14,
    textAlign: "left",
    fontFamily: "PoppinsRegular",
  },
  containerItem: {
    backgroundColor: "#e2faf5",
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 10,
  },
  itemText: {
    color: "#000000",
    fontSize: 12,
  },
  loadingContainer: {
    flexDirection: "row",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  loadingText: {
    color: "#666",
    fontSize: 12,
    fontFamily: "PoppinsRegular",
  },
});

export default SelectComponent;