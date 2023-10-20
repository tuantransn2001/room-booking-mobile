import React, { PropsWithChildren } from "react";
import { Actionsheet, Box, Center } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Pressable, View } from "react-native";
import { COLORS } from "@shared-constants";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import { CallBackFunction } from "shared/type/common";

interface ActionSheetWrapper extends PropsWithChildren {
  title?: string;
  visible?: boolean;
  onClose?: CallBackFunction;
}

const ActionSheetWrapper = ({
  title,
  children,
  onClose,
  visible,
}: ActionSheetWrapper) => {
  return (
    <Center>
      <Actionsheet
        isOpen={visible}
        onClose={onClose}
        size="full"
        style={{
          width: "100%",

          paddingBottom: 20,
          zIndex: 999,
        }}
      >
        <Actionsheet.Content>
          <Box w="100%" h={6} px={4} justifyContent="center">
            <View
              style={{
                position: "relative",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Pressable onPress={onClose}>
                <FontAwesomeIcon icon={faXmark} />
              </Pressable>
              <TextWrapper h4 bold color={COLORS.BLACK}>
                {title}
              </TextWrapper>
            </View>
          </Box>
          <View
            style={{
              marginTop: 30,
              width: "95%",
            }}
          >
            {children}
          </View>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>
  );
};
export default ActionSheetWrapper;
