/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import React from "react";
import { View } from "react-native";
import { Text } from "@ui-kitten/components";
import { Controller, useForm } from "react-hook-form";
import { IFormData } from "./shared/FormWrapper.interface";
import TextInputWrapper from "@shared-components/input-wrapper/Text/TextInputWrapper";
import { InputType } from "./shared/FormWrapper.enum";
import { InputProps } from "@shared-components/input-wrapper/InputWrapper.interface";
import InputWithPassword from "@shared-components/input-wrapper/Password/PasswordInputWrapper";
import SelectInputWrapper from "@shared-components/input-wrapper/Select/SelectInputWrapper";
import { ButtonWrapper } from "@shared-components/button-wrapper/ButtonWrapper";

interface FormWrapperProps {
  data: IFormData[];
  onSubmit: (data: any) => void;
  loading?: boolean;
}

const FormWrapper = (props: FormWrapperProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const renderInputFields = () => {
    return props.data.map((field, i) => {
      return (
        <View
          key={i}
          style={{ marginBottom: i !== props.data.length - 1 ? 18 : 0 }}
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name={field.fieldName as any}
            render={({ field: { onChange, onBlur, value } }) => {
              const inputProps: InputProps = {
                ...field,
                onChange,
                onBlur,
                value,
              };
              if (field.type === InputType.PASSWORD)
                return <InputWithPassword {...inputProps} />;

              if (field.type === InputType.SELECT)
                return <SelectInputWrapper {...inputProps} />;

              return <TextInputWrapper {...inputProps} />;
            }}
          />
          {errors.email && <Text>{field.errorText}</Text>}
        </View>
      );
    });
  };

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "column",
        paddingBottom: 200,
      }}
    >
      {renderInputFields()}

      <ButtonWrapper
        style={{
          marginTop: 20,
        }}
        loading={props.loading}
        primary
        onPress={handleSubmit(props.onSubmit)}
      >
        Submit
      </ButtonWrapper>
    </View>
  );
};

export default FormWrapper;
