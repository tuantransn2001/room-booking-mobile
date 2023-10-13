import React from "react";
import RootLayout from "layouts/rootLayout";
import { SafeAreaView, View } from "react-native";
import createStyles from "./ExploreRoomDetailScreen.style";
import CardWrapper from "@shared-components/card-wrapper/CardWrapper";
import { cards } from "../mocks/data";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import { ButtonWrapper } from "@shared-components/button-wrapper/ButtonWrapper";
import { COLORS } from "@shared-constants";
const ExploreRoomDetailDetailScreen = () => {
  const styles = React.useMemo(() => createStyles(), []);

  const handleBookRoom = () => "booking...";

  return (
    <RootLayout>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flex: 1,
          }}
        >
          <CardWrapper {...cards[0]} />
        </View>

        <View
          style={{
            flex: 1,
          }}
        ></View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: -20,
            borderTopWidth: 1,
            borderColor: COLORS.DISABLE,
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <View>
            <TextWrapper>$ 45 night</TextWrapper>
            <TextWrapper>Feb 10-12</TextWrapper>
          </View>
          <ButtonWrapper onPress={handleBookRoom} primary>
            Reserve
          </ButtonWrapper>
        </View>
      </SafeAreaView>
    </RootLayout>
  );
};

export default ExploreRoomDetailDetailScreen;
