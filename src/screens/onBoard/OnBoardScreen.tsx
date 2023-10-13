import React from "react";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import { SafeAreaView, View } from "react-native";
import RootLayout from "layouts/rootLayout";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { ButtonWrapper } from "@shared-components/button-wrapper/ButtonWrapper";
import { Toggle } from "@ui-kitten/components";
import createStyles from "./OnBoardScreen.style";
import { COLORS, SCREENS } from "@shared-constants";
import { handleNavigate } from "utils";

const OnBoardScreen = () => {
  const styles = React.useMemo(() => createStyles(), []);
  const [activeChecked, setActiveChecked] = React.useState(true);

  const onActiveCheckedChange = (isChecked: boolean): void => {
    setActiveChecked(isChecked);
  };
  return (
    <RootLayout>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: "column",
            gap: 18,
          }}
        >
          <FontAwesomeIcon size={40} color={COLORS.PRIMARY} icon={faBell} />
          <TextWrapper bold h2 color={COLORS.BLACK}>
            Turn on{"\n"}notifications
          </TextWrapper>
        </View>
        <View>
          <TextWrapper h4 left>
            Dont miss important messages like check-in details and account
            activity
          </TextWrapper>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextWrapper h4 left>
            Get travel deals, personalized recommendations, and more
          </TextWrapper>
          <Toggle
            style={styles.toggle}
            checked={activeChecked}
            onChange={onActiveCheckedChange}
          />
        </View>
        <View
          style={{
            marginTop: 40,
            flexDirection: "column",
            gap: 10,
          }}
        >
          <ButtonWrapper
            secondPrimary
            onPress={() => handleNavigate(SCREENS.AUTH)}
          >
            Yes, notifi me
          </ButtonWrapper>
          <ButtonWrapper tertiary onPress={() => handleNavigate(SCREENS.AUTH)}>
            Skip
          </ButtonWrapper>
        </View>
      </SafeAreaView>
    </RootLayout>
  );
};

export default OnBoardScreen;
