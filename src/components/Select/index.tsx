import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { countries } from "../../data/countries";

type SelectProps = {
  onChangeCodigo: (text: string) => void;
};

const SelectComponent: React.FC<SelectProps> = ({ onChangeCodigo }) => {
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
        (country) =>
          country.bandera + country.codigoISO + " (" + country.codigoPais + ")"
      )}
      onSelect={(selectedItem) => {
        const codigo = selectedItem.split("(")[1].split(")")[0];
        onChangeCodigo(codigo);
      }}
      defaultValueByIndex={0}
    />
  );
};
export default SelectComponent;
