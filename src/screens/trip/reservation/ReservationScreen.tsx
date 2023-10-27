/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
import * as React from "react";
import createStyle from "./ReservationScreen.style";
import { Pressable, SafeAreaView, View } from "react-native";
import {
  AspectRatio,
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
} from "native-base";
import { Layout, ViewPager } from "@ui-kitten/components";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import { handleFormatDay } from "utils";
import { ButtonWrapper } from "@shared-components/button-wrapper/ButtonWrapper";
import { faUpload, faXmark } from "@fortawesome/free-solid-svg-icons";

const BoxWrapper = () => {
  const styles = React.useMemo(() => createStyle(), []);

  const renderBadge = () => (
    <Center
      bg="violet.500"
      _dark={{
        bg: "violet.400",
      }}
      _text={{
        color: "warmGray.50",
        fontWeight: "700",
        fontSize: "xs",
      }}
      position="absolute"
      bottom="0"
      px="3"
      py="1.5"
    >
      PHOTOS
    </Center>
  );

  const renderContents = () => (
    <>
      <Stack space={2}>
        <Heading size="md" ml="-1">
          The Garden City
        </Heading>
        <Text
          fontSize="xs"
          _light={{
            color: "violet.500",
          }}
          _dark={{
            color: "violet.400",
          }}
          fontWeight="500"
          ml="-0.5"
          mt="-1"
        >
          The Silicon Valley of India.
        </Text>
      </Stack>
      <Text fontWeight="400">
        Bengaluru (also called Bangalore) is the center of India's high-tech
        industry. The city is also known for its parks and nightlife.
      </Text>
      <HStack alignItems="center" space={4} justifyContent="space-between">
        <HStack alignItems="center">
          <Text
            color="coolGray.600"
            _dark={{
              color: "warmGray.200",
            }}
            fontWeight="400"
          >
            6 mins ago
          </Text>
        </HStack>
      </HStack>
    </>
  );

  return (
    <Pressable onPress={() => console.log("press")}>
      <Box alignItems="center">
        <Box
          maxW="100%"
          overflow="hidden"
          borderColor="coolGray.200"
          _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700",
          }}
          _web={{
            shadow: 4,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: "gray.50",
          }}
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <ViewPager
                selectedIndex={1}
                onSelect={(index) => console.log(index)}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                {[1, 2].map((id) => (
                  <Layout level="2" key={id}>
                    <View style={[styles.buttonStickWrapper, { left: 14 }]}>
                      <ButtonWrapper
                        onPress={() => console.log("back")}
                        style={styles.buttonStick}
                        primary
                        StartIcon={faXmark}
                        ghost
                      />
                    </View>

                    <View style={[styles.buttonStickWrapper, { right: 14 }]}>
                      <ButtonWrapper
                        onPress={() => console.log("back")}
                        style={styles.buttonStick}
                        primary
                        StartIcon={faUpload}
                        ghost
                      />
                    </View>

                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                      }}
                      source={{
                        uri: "https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg",
                      }}
                    />
                  </Layout>
                ))}
              </ViewPager>
            </AspectRatio>
            {renderBadge()}
          </Box>
          <Stack p="4" space={3}>
            {renderContents()}
          </Stack>
        </Box>
      </Box>
    </Pressable>
  );
};

const ReservationScreen = () => {
  const styles = React.useMemo(() => createStyle(), []);
  return (
    <SafeAreaView style={styles.container}>
      <BoxWrapper />
      <Box alignItems="center">
        <Box w="100%">
          <Flex mx="3" direction="row" justify="space-between" h="60">
            <View
              style={{
                flexDirection: "column",
              }}
            >
              <TextWrapper>Checkin</TextWrapper>
              <TextWrapper> {handleFormatDay(new Date())}</TextWrapper>
            </View>
            <Divider
              orientation="vertical"
              mx="3"
              _light={{
                bg: "muted.800",
              }}
              _dark={{
                bg: "muted.50",
              }}
            />
            <View
              style={{
                flexDirection: "column",
              }}
            >
              <TextWrapper>Checkout</TextWrapper>
              <TextWrapper> {handleFormatDay(new Date())} </TextWrapper>
            </View>
          </Flex>
        </Box>
      </Box>
    </SafeAreaView>
  );
};
export default ReservationScreen;
