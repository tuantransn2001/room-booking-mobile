import React, { PropsWithChildren } from "react";
import { Button } from "@ui-kitten/components";
import createStyles from "./ButtonWrapper.style";
import { ViewStyle } from "react-native";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import { COLORS } from "@shared-constants";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import LoadingIndicator from "@shared-components/loading-wrapper/LoadingWrapper";
import { Appearance } from "./enum/style.enum";
interface ButtonWrapperProps extends PropsWithChildren {
  primary?: boolean;
  ghost?: boolean;
  loading?: boolean;
  tertiary?: boolean;
  maxWidth?: boolean;
  secondPrimary?: boolean;
  style?: ViewStyle;
  StartIcon?: IconDefinition;
  onPress?: () => void;
}

export const ButtonWrapper = ({
  ghost,
  primary,
  secondPrimary,
  tertiary,
  maxWidth,
  StartIcon,
  onPress,
  children,
  loading,
  style,
}: ButtonWrapperProps) => {
  const styles = React.useMemo(() => createStyles(), []);
  let textColor = COLORS.WHITE;

  // ? Primary
  if (primary) {
    styles.common = { ...styles.common, ...styles.primary };
  }

  // ? Full width or small
  if (maxWidth) {
    styles.common = { ...styles.common, ...styles.fullWidth };
  }

  // ? Second primary
  if (secondPrimary) {
    styles.common = { ...styles.common, ...styles.secondPrimary };
  }

  // ? Tertiary
  if (tertiary) {
    styles.common = {
      ...styles.common,
      ...styles.tertiary,
    };
    styles.textDefault = {
      ...styles.textDefault,
    };
    textColor = COLORS.BLACK;
  }

  // ? Ghost
  if (ghost) {
    styles.common = { ...styles.common, ...styles.ghost };
    textColor = COLORS.BLACK;
  }

  const renderStartIcon = () => {
    if (loading) return <LoadingIndicator />;
    if (StartIcon)
      return (
        <FontAwesomeIcon color={textColor} icon={StartIcon as IconDefinition} />
      );

    return <React.Fragment />;
  };

  return (
    <Button
      status="success"
      onPress={onPress}
      accessoryLeft={renderStartIcon()}
      appearance={Appearance.filled}
      size="medium"
      style={{ ...styles.common, ...style }}
    >
      {children ? (
        <TextWrapper color={textColor} style={styles.textDefault}>
          {children}
        </TextWrapper>
      ) : (
        <></>
      )}
    </Button>
  );
};
