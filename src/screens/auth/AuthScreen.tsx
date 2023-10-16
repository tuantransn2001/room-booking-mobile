import * as React from "react";
import { SafeAreaView, View } from "react-native";
import Login from "./login/Login";
import { isLoginSuccessSelector, useUserStore } from "stores/userStore";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import { ButtonWrapper } from "@shared-components/button-wrapper/ButtonWrapper";
import { faGolfBall } from "@fortawesome/free-solid-svg-icons";
import ActionSheetWrapper from "@shared-components/action-sheet-wrapper/ActionSheetWrapper";
import Register from "./register/Register";
import { useToastWrapper } from "hooks/useToastWrapper";
const AuthScreen = () => {
  const isLoginSuccess = useUserStore(isLoginSuccessSelector);
  if (isLoginSuccess) {
    // ? Director
  }
  const [visible, setVisible] = React.useState<boolean>(true);
  const [isLogin, setIsLogin] = React.useState<boolean>(true);

  const handleToggleIsLogin = () => setIsLogin(!isLogin);

  const { showToast } = useToastWrapper();

  return (
    <SafeAreaView>
      <ActionSheetWrapper
        visible={visible}
        title={isLogin ? "Log in" : "Sign up"}
      >
        {isLogin ? (
          <Login setVisible={setVisible} showToast={showToast} />
        ) : (
          <Register setVisible={setVisible} showToast={showToast} />
        )}
        <View
          style={{
            width: "100%",
            marginTop: 10,
            flexDirection: "column",
            gap: 20,
          }}
        >
          <ButtonWrapper link maxWidth onPress={handleToggleIsLogin}>
            {isLogin ? "Sign up" : "Sign in"}
          </ButtonWrapper>

          {isLogin && (
            <View
              style={{
                flexDirection: "column",
                gap: 8,
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
          )}
        </View>
      </ActionSheetWrapper>
    </SafeAreaView>
  );
};
export default AuthScreen;
