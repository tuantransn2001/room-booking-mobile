/* eslint-disable camelcase */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Text, View, TextInput, Button } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Section from "../../../shared/components/section-wrapper/SectionWrapper";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import { ButtonWrapper } from "@shared-components/button-wrapper/ButtonWrapper";
import ActionSheetWrapper from "@shared-components/action-sheet-wrapper/ActionSheetWrapper";
import TextInputWrapper from "@shared-components/input-wrapper/Text/TextInputWrapper";
import SelectInputWrapper from "@shared-components/input-wrapper/Select/SelectInputWrapper";
import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "graphql/query/GetCountries";
import { IFormData } from "@shared-components/form-wrapper/shared/FormWrapper.interface";
import { InputType } from "@shared-components/form-wrapper/shared/FormWrapper.enum";
import { ObjectLiteral } from "shared/type/common";
import FormWrapper from "@shared-components/form-wrapper/FormWrapper";

const Form = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });
  const onSubmit = (data) => console.log(data);

  const { data, loading } = useQuery(GET_COUNTRIES, {
    variables: {
      page_size: 10,
      page_number: 1,
      search: "",
    },
  });
  console.log({ data: data.getCountry });

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <SelectInputWrapper
              label="Country/Region"
              placeholder="United state (+1)"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              options={data.getCountry.map(({ countryName, id }) => ({
                label: countryName,
                value: id,
              }))}
            />
          </View>
        )}
        name="firstName"
      />
      {errors.firstName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            style={{
              marginBottom: 20,
            }}
          >
            <TextInputWrapper
              placeholder="Phone number"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
            />
          </View>
        )}
        name="lastName"
      />

      <ButtonWrapper primary onPress={handleSubmit(onSubmit)}>
        Submit
      </ButtonWrapper>
    </View>
  );
};

const AddPhoneNumberActionSheet = () => {
  const { data, loading } = useQuery(GET_COUNTRIES, {
    variables: {
      page_size: 10,
      page_number: 1,
      search: "",
    },
  });
  console.log({ data: data.getCountry });

  const fields: IFormData[] = [
    {
      fieldName: "country",
      label: "Country/Region",
      placeholder: "United state(+1)",
      type: InputType.SELECT,
      options: data.getCountry.map(
        ({ id: value, countryName: label }: ObjectLiteral) => ({
          label,
          value,
        }),
      ),
    },
    {
      fieldName: "phone",
      label: "Phone number",
      placeholder: "Place your phone number",
      type: InputType.TEXT,
    },
  ];

  return (
    <ActionSheetWrapper
      visible={true}
      title="Add phone number"
      onClose={() => console.log("close")}
    >
      <FormWrapper
        onSubmit={() => {
          console.log("submit");
        }}
        data={fields}
      />
    </ActionSheetWrapper>
  );
};

const RequiredYourTrip = () => {
  return (
    <>
      <AddPhoneNumberActionSheet />
      <Section title="Required to your trip">
        <View
          style={{
            flexDirection: "column",
            gap: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                gap: 4,
              }}
            >
              <TextWrapper bold h4>
                Message the host
              </TextWrapper>
              <TextWrapper h5>
                Let the host know why are you {"\n"} traveling and when you are
                check in
              </TextWrapper>
            </View>
            <View>
              <ButtonWrapper link>Add</ButtonWrapper>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                gap: 4,
              }}
            >
              <TextWrapper bold h4>
                Profile photo
              </TextWrapper>
              <TextWrapper h5>
                Host want to know who's staying {"\n"} their place
              </TextWrapper>
            </View>
            <View>
              <ButtonWrapper link>Add</ButtonWrapper>
            </View>
          </View>
        </View>
      </Section>
    </>
  );
};
export default RequiredYourTrip;
