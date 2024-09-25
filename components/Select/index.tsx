import React, { useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { countries, Country } from "@/config/data/countries";
import { StyleSheet, Text, View } from "react-native";
import MyIcon from "../ui/MyIcon";
import useIp from "@/presentation/hooks/useIp";

type SelectProps = {
  onChangeCodigo: (text: string) => void;
};

const SelectComponent: React.FC<SelectProps> = ({ onChangeCodigo }) => {
  const { country } = useIp();

  const selectedCountry = countries.find((c) =>
    c.codigoISO.includes(country ?? "")
  );

  const defaultIndex = selectedCountry
    ? countries.findIndex((c) => c.codigoISO === selectedCountry.codigoISO)
    : 0;

  useEffect(() => {
    if (selectedCountry) {
      onChangeCodigo(selectedCountry.codigoPais);
    }
  }, [selectedCountry]);

  return (
    <SelectDropdown
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.containerSelect}>
            <Text style={styles.textSelect}>
              {selectedItem || "Seleccione un país"}
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
                backgroundColor: isSelected ? "#25d366" : "#e2faf5",
              },
            ]}
          >
            <Text
              style={[
                styles.itemText,
                {
                  fontFamily: isSelected ? "PoppinsBold" : "PoppinsRegular",
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
    backgroundColor: "#e2faf5",
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
});

export default SelectComponent;
