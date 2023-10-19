import React from "react";
import { Container, FormControl, HStack, Select, Text } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { InputProps } from "../InputWrapper.interface";
const SelectInputWrapper = (props: InputProps) => {
  const [value, setValue] = React.useState("");

  const renderOptions = () =>
    props.options?.map(({ label, value }, i) => {
      return <Select.Item label={label} value={value} key={i} />;
    });

  return (
    <Container minWidth="100%">
      <FormControl isRequired>
        <FormControl.Label>{props.label}</FormControl.Label>
        <Select
          selectedValue={value}
          minWidth={200}
          minHeight={10}
          accessibilityLabel={props.options ? props.options[0].label : ""}
          placeholder={props.placeholder}
          onValueChange={(itemValue) => {
            setValue(itemValue);
            props.onChange(itemValue);
          }}
          _selectedItem={{
            bg: "teal.600",
            endIcon: <FontAwesomeIcon size={2} icon={faAngleDown} />,
          }}
          mt={1}
          {...props}
        >
          {renderOptions()}
        </Select>
      </FormControl>
      <HStack mt={3} alignItems="baseline">
        <Text fontSize="md">Selected Values: </Text>
        <Text fontSize="md" bold>
          {value}
        </Text>
      </HStack>
    </Container>
  );
};
export default SelectInputWrapper;
