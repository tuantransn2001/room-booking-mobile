/* eslint-disable import/extensions */
import React, { useMemo } from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
/**
 * ? Local Imports
 */
import createStyles from "./LoginScreen.style";
import RootLayout from "layouts/rootLayout";
import { ModalUsage } from "@shared-components/modal-wrapper/ModalWrapper";
import Logo from "assets/logo/logo";
import { LoginUserMutation } from "gql/graphql";
import { LOGIN_USER } from "graphql/mutations/Login";
import { useMutation } from "@apollo/client";
import { IFormData } from "@shared-components/form-wrapper/shared/FormWrapper.interface";
import { InputType } from "@shared-components/form-wrapper/shared/FormWrapper.enum";
import FormWrapper from "@shared-components/form-wrapper/FormWrapper";
import { useUserStore } from "stores/userStore";

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
    errorText: "This is required.",
    type: InputType.PASSWORD,
  },
];

interface LoginProps {}

const LoginScreen: React.FC<LoginProps> = () => {
  const setUser = useUserStore((state) => state.setUser);
  const [visible, setVisible] = React.useState<boolean>(true);
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [loginUser, { loading }] = useMutation<LoginUserMutation>(LOGIN_USER);

  const onSubmit = (d: any) => {
    loginUser({
      variables: {
        email: d.email,
        password: d.password,
      },
      onCompleted: (data) => {
        const userResponse = data.login.user;
        delete userResponse.__typename;
        setUser(userResponse);
      },
    }).catch((err) => {
      // ? Handle error here
      console.log("on err:::", err);
    });
  };

  return (
    <RootLayout>
      <View style={styles.container}>
        <View
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            padding: 40,
          }}
        >
          <Logo />
        </View>
        <ModalUsage title="Login" visible={visible} setVisible={setVisible}>
          <FormWrapper
            loading={loading}
            data={loginFormData}
            onSubmit={onSubmit}
          />
        </ModalUsage>
      </View>
    </RootLayout>
  );
};

export default LoginScreen;
