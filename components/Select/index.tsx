import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { countries } from "@/config/data/countries";
import { Text, View } from "react-native";
import MyIcon from "../ui/MyIcon";

type SelectProps = {
  onChangeCodigo: (text: string) => void;
};

const SelectComponent: React.FC<SelectProps> = ({ onChangeCodigo }) => {
  return (
    <SelectDropdown
      //rowTextStyle={{ color: "#000000", fontSize: 14, textAlign: "left" }}
      //buttonTextStyle={{ fontSize: 14, fontWeight: "bold" }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View>
            {selectedItem && <MyIcon name={selectedItem.icon} />}
            <Text>
              {(selectedItem && selectedItem.title) || "Select your mood"}
            </Text>
            <MyIcon name={isOpened ? "chevron-up" : "chevron-down"} />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...(isSelected && { backgroundColor: "#D2D9DF" }),
            }}
          >
            <MyIcon name={item.icon} />
            <Text>{item.title}</Text>
          </View>
        );
      }}
      //buttonStyle={{width: "100%",height: 30,backgroundColor: "#e2faf5",}}
      //rowStyle={{width: "100%",height: 50,backgroundColor: "#e2faf5",borderBottomWidth: 0,}}
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
