/* eslint-disable import/extensions */
import React from "react";
import createStyle from "./RegisterScreen.style";
import ActionSheetWrapper from "@shared-components/action-sheet-wrapper/ActionSheetWrapper";
import { IFormData } from "@shared-components/form-wrapper/shared/FormWrapper.interface";
import { InputType } from "@shared-components/form-wrapper/shared/FormWrapper.enum";

import FormWrapper from "@shared-components/form-wrapper/FormWrapper";
import { SafeAreaView } from "react-native";
import { handleGetAllCountryApi } from "apis/country/country";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";

const RegisterScreen = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [countries, setCountries] = React.useState<any[]>([]);
  const styles = React.useMemo(() => createStyle(), []);

  const fields: IFormData[] = React.useMemo(
    () => [
      {
        fieldName: "email",
        label: "Email",
        placeholder: "Enter your email",
        caption: "This shouldn't be empty",
        errorText: "",
        type: InputType.TEXT,
      },
      {
        fieldName: "phoneNumber",
        label: "PhoneNumber",
        placeholder: "Enter your phone Ex: +84",
        caption: "This shouldn't be empty",
        errorText: "",
        type: InputType.TEXT,
      },
      // {
      //   fieldName: "country",
      //   label: "Country/Region",
      //   caption: "This shouldn't be empty",
      //   options: countries,
      //   type: InputType.SELECT,
      // },
    ],
    [
      // countries
    ],
  );

  const handleGetCountry = async () => {
    try {
      setIsLoading(true);
      const countryData = await handleGetAllCountryApi();

      const countryArr = Object.values(countryData.data)
        .slice(0, 5)
        .map(({ name: label, alpha2Code: value, flag }: any) => ({
          label,
          value,
          flag,
        }));

      setCountries(() => [...countryArr]);
      setIsLoading(false);
    } catch (err) {
      console.log("fail:::", err);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    handleGetCountry();
  }, []);

  const onSubmit = (data: any) => {
    console.log("register result:::", data);
  };

  if (isLoading || countries.length === 0)
    return <TextWrapper>loading</TextWrapper>;

  return (
    <SafeAreaView style={styles.container}>
      <ActionSheetWrapper visible={true} title="Login or Signup">
        <FormWrapper data={fields} onSubmit={onSubmit} />
      </ActionSheetWrapper>
    </SafeAreaView>
  );
};
export default RegisterScreen;
