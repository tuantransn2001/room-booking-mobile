/* eslint-disable import/extensions */
import React from "react";
/**
 * ? Local Imports
 */
import { LoginUserMutation } from "gql/graphql";
import { LOGIN_USER } from "graphql/mutations/Login";
import { useMutation } from "@apollo/client";
import { IFormData } from "@shared-components/form-wrapper/shared/FormWrapper.interface";
import { InputType } from "@shared-components/form-wrapper/shared/FormWrapper.enum";
import FormWrapper from "@shared-components/form-wrapper/FormWrapper";
import { useUserStore } from "stores/userStore";
import {
  IToastWrapper,
  ToastCallback,
} from "hooks/toast/shared/useToastWrapper.interface";
import { Status, Variant } from "@shared-components/toast-wrapper/enum/enum";
import { SetState } from "shared/type/common";
import { handleNavigate } from "utils";
import { SCREENS } from "@shared-constants";

const loginFormData: IFormData[] = [
  {
    fieldName: "email",
    label: "Email",
    placeholder: "Place your email",
    errorText: "This is required.",
    type: InputType.TEXT,
  },
  {
    fieldName: "password",
    label: "Password",
    placeholder: "Place your password",
    caption: "Should contain at least 8 symbols",
    type: InputType.PASSWORD,
  },
];

interface LoginProps {
  setVisible: SetState<boolean>;
  showToast: ToastCallback;
}

const Login = ({ setVisible, showToast }: LoginProps) => {
  const setUser = useUserStore((state) => state.setUser);
  const [loginUser, { loading }] = useMutation<LoginUserMutation>(LOGIN_USER);

  const handleLogin = ({ email, password }: any) => {
    loginUser({
      variables: {
        email,
        password,
      },
      onCompleted: (data) => {
        const toastData: IToastWrapper = {
          title: "Login Success",
          variant: Variant.solid,
          status: Status.success,
          description: "Moving to Home Screen",
          isClosable: true,
        };

        showToast(toastData);

        setTimeout(() => {
          const userResponse = data.login.user;
          delete userResponse.__typename;
          setUser(userResponse);
          setVisible(false);
          handleNavigate(SCREENS.EXPLORE);
        }, 4000);
      },
    }).catch((err) => {
      const toastData: IToastWrapper = {
        title: err.message,
        variant: Variant.solid,
        status: Status.warning,
        description: "Please enter a valid email address | password",
        isClosable: true,
      };

      showToast(toastData);
    });
  };

  return (
    <FormWrapper
      loading={loading}
      data={loginFormData}
      onSubmit={handleLogin}
    />
  );
};

export default Login;
