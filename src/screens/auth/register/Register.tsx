/* eslint-disable import/extensions */
import React from "react";
import { IFormData } from "@shared-components/form-wrapper/shared/FormWrapper.interface";
import { InputType } from "@shared-components/form-wrapper/shared/FormWrapper.enum";
import FormWrapper from "@shared-components/form-wrapper/FormWrapper";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "graphql/mutations/Register";
import { RegisterUserMutation, User } from "gql/graphql";
import { useUserStore } from "stores/userStore";
import { handleNavigate } from "utils";
import { SCREENS } from "@shared-constants";
import { SetState } from "shared/type/common";
import {
  IToastWrapper,
  ToastCallback,
} from "hooks/shared/useToastWrapper.interface";
import { Variant, Status } from "@shared-components/toast-wrapper/enum/enum";

interface RegisterProps {
  setVisible: SetState<boolean>;
  showToast: ToastCallback;
}

const Register = ({ setVisible, showToast }: RegisterProps) => {
  const setUser = useUserStore((state) => state.setUser);
  const [registerUser, { loading }] =
    useMutation<RegisterUserMutation>(REGISTER_USER);

  const fields: IFormData[] = React.useMemo(
    () => [
      {
        fieldName: "fullname",
        label: "Full name",
        placeholder: "Enter your fullname",
        caption: "This shouldn't be empty",
        errorText: "",
        type: InputType.TEXT,
      },
      {
        fieldName: "email",
        label: "Email",
        placeholder: "Enter your email",
        caption: "This shouldn't be empty",
        errorText: "",
        type: InputType.TEXT,
      },
      {
        fieldName: "password",
        label: "Password",
        placeholder: "Enter your password",
        caption: "This shouldn't be empty",
        errorText: "",
        type: InputType.PASSWORD,
      },
      {
        fieldName: "country",
        label: "Country/Region",
        placeholder: "Select your country",
        caption: "This shouldn't be empty",
        options: [
          {
            value: "Brazil",
            label: "Bra",
          },
        ],
        type: InputType.SELECT,
      },
    ],
    [],
  );

  const handleRegister = ({ fullname, email, password }: any) => {
    registerUser({
      variables: {
        fullname,
        email,
        password,
        confirmPassword: password,
        companyId: 1,
      },
      onCompleted: (data) => {
        const toastData: IToastWrapper = {
          title: "Register success!",
          variant: Variant.solid,
          status: Status.success,
          description: "Moving to Home Screen",
          isClosable: true,
        };
        showToast(toastData);

        setTimeout(() => {
          const userResponse = data.register.user ?? {};
          setUser(userResponse as User);
          handleNavigate(SCREENS.EXPLORE);
          setVisible(false);
        }, 4000);
      },
    }).catch((err) => {
      const toastData: IToastWrapper = {
        title: err.message,
        variant: Variant.solid,
        status: Status.warning,
        description: "Please enter a valid email address | password | fullname",
        isClosable: true,
      };
      showToast(toastData);
    });
  };

  return (
    <FormWrapper
      data={fields}
      onSubmit={handleRegister}
      submitAction="Continue"
      loading={loading}
    />
  );
};
export default Register;
