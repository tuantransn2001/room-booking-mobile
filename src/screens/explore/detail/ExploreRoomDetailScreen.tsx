import React from "react";
import RootLayout from "layouts/rootLayout";
import { SafeAreaView } from "react-native";
import createStyles from "./ExploreRoomDetailScreen.style";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";

const ExploreRoomDetailDetailScreen = () => {
  const styles = React.useMemo(() => createStyles(), []);
  return (
    <RootLayout>
      <SafeAreaView style={styles.container}>
        <TextWrapper>Explore room</TextWrapper>
      </SafeAreaView>
    </RootLayout>
  );
};

export default ExploreRoomDetailDetailScreen;
