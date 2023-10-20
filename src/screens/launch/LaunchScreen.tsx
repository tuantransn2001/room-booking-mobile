/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/extensions */
import React from "react";
import Logo from "assets/logo/logo";
import { View } from "react-native";
import { SCREENS } from "@shared-constants";
import { Box, Center, VStack, Progress } from "native-base";
import createStyles from "./LaunchScreen.style";
import { handleNavigate } from "utils";

const LaunchScreen = () => {
  const styles = React.useMemo(() => createStyles(), []);
  const [percent, setPercent] = React.useState<number>(0);

  const animate = React.useCallback(() => {
    const intervalId = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(intervalId);
          handleNavigate(SCREENS.ON_BOARD);
          return prev;
        }
        return (prev += 1);
      });
    }, 30);
  }, [percent]);

  React.useEffect(() => {
    animate();
  }, []);

  return (
    <View style={styles.container}>
      <Logo />
      <Center w="100%">
        <Box w="70%" maxW="400">
          <VStack space="md">
            <VStack mx="4" space="md">
              <Progress colorScheme="secondary" value={percent} />
            </VStack>
          </VStack>
        </Box>
      </Center>
    </View>
  );
};

export default LaunchScreen;
