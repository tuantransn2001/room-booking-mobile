import React from "react";
import { Input } from "@ui-kitten/components";
import { InputProps } from "../InputWrapper.interface";

const TextInputWrapper = (props: InputProps): React.ReactElement => (
  <Input
    style={{
      width: "100%",
    }}
    autoCapitalize="none"
    {...props}
    onChangeText={props.onChange}
  />
);

export default TextInputWrapper;
