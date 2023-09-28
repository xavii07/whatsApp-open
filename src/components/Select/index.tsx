import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { countries } from "../../data/countries";

const SelectComponent: React.FC = () => {
  return (
    <SelectDropdown
      rowTextStyle={{ color: "#000000", fontSize: 14, textAlign: "left" }}
      buttonTextStyle={{ fontSize: 14, fontWeight: "bold" }}
      buttonStyle={{
        width: "100%",
        height: 30,
        backgroundColor: "#e2faf5",
      }}
      rowStyle={{
        width: "100%",
        height: 50,
        backgroundColor: "#e2faf5",
        borderBottomWidth: 0,
      }}
      data={countries.map(
        (country) => "🇪🇨 " + country.codigoISO + " (" + country.codigoPais + ")"
      )}
      onSelect={(selectedItem, index) => {
        console.log(selectedItem, index);
      }}
      defaultValueByIndex={0}
    />
  );
};
export default SelectComponent;
