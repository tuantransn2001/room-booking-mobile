/* eslint-disable import/extensions */
import { useTheme } from "@react-navigation/native";
import React, { useMemo } from "react";
import { View } from "react-native";
/**
 * ? Local Imports
 */
import createStyles from "./LoginScreen.style";
import RootLayout from "layouts/rootLayout";
import Logo from "assets/logo/logo";
import { LoginUserMutation } from "gql/graphql";
import { LOGIN_USER } from "graphql/mutations/Login";
import { useMutation } from "@apollo/client";
import { IFormData } from "@shared-components/form-wrapper/shared/FormWrapper.interface";
import { InputType } from "@shared-components/form-wrapper/shared/FormWrapper.enum";
import FormWrapper from "@shared-components/form-wrapper/FormWrapper";
import { useUserStore } from "stores/userStore";
import { handleNavigate } from "utils";
import { SCREENS } from "@shared-constants";
import ActionSheetWrapper from "@shared-components/action-sheet-wrapper/ActionSheetWrapper";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import { ButtonWrapper } from "@shared-components/button-wrapper/ButtonWrapper";
import { faGolfBall } from "@fortawesome/free-solid-svg-icons";
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

interface LoginProps {}

const LoginScreen: React.FC<LoginProps> = () => {
  const setUser = useUserStore((state) => state.setUser);
  const [visible, setVisible] = React.useState<boolean>(true);
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [loginUser, { loading }] = useMutation<LoginUserMutation>(LOGIN_USER);

  const onSubmit = ({ email, password }: any) => {
    loginUser({
      variables: {
        email,
        password,
      },
      onCompleted: (data) => {
        const userResponse = data.login.user;
        delete userResponse.__typename;
        setUser(userResponse);
        handleNavigate(SCREENS.EXPLORE);
        setVisible(false);
      },
    }).catch((err) => {
      console.log("handling...:::", err);
    });
  };

  return (
    <RootLayout>
      <View style={styles.container}>
        <Logo />

        <ActionSheetWrapper visible={visible} title="Login or Signup">
          <FormWrapper
            loading={loading}
            data={loginFormData}
            onSubmit={onSubmit}
          />

          <View
            style={{
              width: "100%",
              marginTop: 20,
              flexDirection: "column",
              gap: 20,
              paddingBottom: 200,
            }}
          >
            <TextWrapper center>or</TextWrapper>

            <View
              style={{
                flexDirection: "column",
                gap: 8,
              }}
            >
              <ButtonWrapper tertiary maxWidth StartIcon={faGolfBall}>
                Continue with google
              </ButtonWrapper>
              <ButtonWrapper tertiary maxWidth StartIcon={faGolfBall}>
                Continue with google
              </ButtonWrapper>
              <ButtonWrapper tertiary maxWidth StartIcon={faGolfBall}>
                Continue with google
              </ButtonWrapper>
              <ButtonWrapper tertiary maxWidth StartIcon={faGolfBall}>
                Continue with google
              </ButtonWrapper>
            </View>
          </View>
        </ActionSheetWrapper>
      </View>
    </RootLayout>
  );
};

export default LoginScreen;
