import React, { useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { countries, Country } from "@/config/data/countries";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import MyIcon from "../ui/MyIcon";
import useIp from "@/presentation/hooks/useIp";
import { COLOR_BLANCO, COLOR_SECONDARY } from "@/config/data/consts";

type SelectProps = {
  onChangeCodigo: (text: string) => void;
};

const screenWidth = Dimensions.get("window").width;

const getIso2FromFlag = (flag: string) => {
  const chars = [...flag.trim()];
  if (chars.length < 2) return "";

  return chars
    .slice(0, 2)
    .map((char) => String.fromCharCode((char.codePointAt(0) ?? 0) - 127397))
    .join("")
    .toUpperCase();
};

const findCountryByDetectedCode = (detectedCode: string | null | undefined) => {
  const code = (detectedCode ?? "").trim().toUpperCase();
  if (!code) return undefined;

  return countries.find((country) => {
    const iso3 = country.codigoISO.toUpperCase();
    const iso2 = getIso2FromFlag(country.bandera);

    return iso3 === code || iso2 === code || iso3.includes(code);
  });
};

const SelectComponent: React.FC<SelectProps> = ({ onChangeCodigo }) => {
  const { country, isLoading } = useIp();
  const selectedCountry = findCountryByDetectedCode(country);

  const defaultIndex = selectedCountry
    ? countries.findIndex((c) => c.codigoISO === selectedCountry.codigoISO)
    : 0;

  useEffect(() => {
    if (selectedCountry) {
      onChangeCodigo(selectedCountry.codigoPais);
    }
  }, [selectedCountry, onChangeCodigo]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={COLOR_SECONDARY} />
        <Text style={styles.loadingText}>Detectando país...</Text>
      </View>
    );
  }

  return (
    <SelectDropdown
      renderButton={(selectedItem, isOpened) => {
        const item = selectedItem as Country | undefined;

        return (
          <View style={styles.containerSelect}>
            <Text style={styles.textSelect}>
              {(item &&
                `${item.bandera} ${item.codigoISO} (${item.codigoPais})`) ||
                (selectedCountry
                  ? selectedCountry.bandera + " " + selectedCountry.codigoISO
                  : "Seleccione un país")}
            </Text>
            <MyIcon name={isOpened ? "chevron-up" : "chevron-down"} />
          </View>
        );
      }}
      renderItem={(item, isSelected) => {
        const countryItem = item as Country;

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
                  color: isSelected ? COLOR_BLANCO : "#000000",
                },
              ]}
            >
              {`${countryItem.bandera} ${countryItem.pais} • ${countryItem.codigoISO} (${countryItem.codigoPais})`}
            </Text>
          </View>
        );
      }}
      data={countries}
      defaultValueByIndex={defaultIndex}
      search
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownStyle}
      searchPlaceHolder="Buscar país o código"
      searchPlaceHolderColor="#64748b"
      searchInputStyle={styles.searchInput}
      searchInputTxtStyle={styles.searchInputText}
      onSelect={(selectedItem) => {
        const item = selectedItem as Country;
        onChangeCodigo(item.codigoPais);
      }}
    />
  );
};

const styles = StyleSheet.create({
  containerSelect: {
    flexDirection: "row",
    height: 34,
    minWidth: 170,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    gap: 8,
  },
  textSelect: {
    flex: 1,
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
  dropdownStyle: {
    width: Math.min(screenWidth - 24, 200),
    borderRadius: 10,
    backgroundColor: "#f8fafc",
  },
  searchInput: {
    width: Math.min(screenWidth - 24, 200),
    borderRadius: 8,
    borderColor: "#cbd5e1",
    backgroundColor: "#fff",
  },
  searchInputText: {
    fontFamily: "PoppinsRegular",
    fontSize: 13,
    color: "#0f172a",
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
