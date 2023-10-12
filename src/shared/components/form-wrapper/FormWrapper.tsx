/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
import React from "react";
import { View } from "react-native";
import { Input, Text } from "@ui-kitten/components";
import createStyle from "./FormWrapper.style";
import { Controller, useForm } from "react-hook-form";
import { ButtonWrapper } from "@shared-components/button-wrapper/ButtonWrapper";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import { faEye, faEyeSlash, faTicket } from "@fortawesome/free-solid-svg-icons";
import { IFormData } from "./shared/FormWrapper.interface";
import { InputType } from "./shared/FormWrapper.enum";

interface InputProps extends Partial<IFormData> {
  onChange: () => void;
  onBlur: () => void;
  value: string;
}

const DefaultInput = (props: InputProps): React.ReactElement => {
  return (
    <Input autoCapitalize="none" {...props} onChangeText={props.onChange} />
  );
};

const InputWithPassword = (props: InputProps): React.ReactElement => {
  const styles = React.useMemo(() => createStyle(), []);
  const [secureTextEntry, setSecureTextEntry] = React.useState<boolean>(true);

  const handleToggleSecureTextEntry = () =>
    setSecureTextEntry(!secureTextEntry);

  const renderCaption = (): React.ReactElement => {
    return (
      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>{props.caption}</Text>
      </View>
    );
  };

  return (
    <Input
      autoCapitalize="none"
      caption={renderCaption}
      accessoryRight={
        <ButtonWrapper
          onPress={handleToggleSecureTextEntry}
          ghost
          StartIcon={secureTextEntry ? faEyeSlash : faEye}
        />
      }
      secureTextEntry={secureTextEntry}
      {...props}
      onChangeText={props.onChange}
    />
  );
};

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
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const renderInputFields = () => {
    return props.data.map(
      ({ fieldName, errorText, label, placeholder, type, ...rest }) => {
        const renderInput = (props: InputProps) => {
          if (type === InputType.PASSWORD)
            return <InputWithPassword {...props} />;

          return <DefaultInput {...props} />;
        };

        return (
          <>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              name={fieldName as any}
              render={({ field: { onChange, onBlur, value } }) =>
                renderInput({
                  onChange,
                  onBlur,
                  value,
                  label,
                  placeholder,
                  ...rest,
                })
              }
            />
            {errors.email && <Text>{errorText}</Text>}
          </>
        );
      },
    );
  };

  return (
    <View
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      {renderInputFields()}

      <ButtonWrapper
        loading={props.loading}
        primary
        onPress={handleSubmit(props.onSubmit)}
      >
        Submit
      </ButtonWrapper>

      <View>
        <TextWrapper center>or</TextWrapper>
        <View
          style={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <ButtonWrapper StartIcon={faTicket} tertiary>
            Continue with Google
          </ButtonWrapper>
          <ButtonWrapper StartIcon={faTicket} tertiary>
            Continue with Facebook
          </ButtonWrapper>
          <ButtonWrapper StartIcon={faTicket} tertiary>
            Continue with Email
          </ButtonWrapper>
          <ButtonWrapper StartIcon={faTicket} tertiary>
            Continue with Apple
          </ButtonWrapper>
        </View>
      </View>
    </View>
  );
};

export default FormWrapper;
