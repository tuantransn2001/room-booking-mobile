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
  link?: boolean;
  ghost?: boolean;
  loading?: boolean;
  disabled?: boolean;
  tertiary?: boolean;
  maxWidth?: boolean;
  secondPrimary?: boolean;
  style?: ViewStyle;
  StartIcon?: IconDefinition;
  onPress?: () => void;
  onPressOut?: () => void;
  [key: string]: any;
}

export const ButtonWrapper = ({
  ghost,
  disabled,
  primary,
  secondPrimary,
  tertiary,
  maxWidth,
  StartIcon,
  children,
  loading,
  style,
  link,
  onPress,
  onPressOut,
  ...rest
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

    textColor = COLORS.BLACK;
  }
  // ? Link
  if (link) {
    styles.common = {
      ...styles.common,
      ...styles.link,
    };
    textColor = COLORS.BLACK;
  }

  // ? Ghost
  if (ghost) {
    styles.common = { ...styles.common, ...styles.ghost };
    textColor = COLORS.BLACK;
  }

  // ? Disabled
  if (disabled) {
    styles.common = { ...styles.common, ...styles.disabled };
    textColor = COLORS.WHITE;
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
      disabled={disabled}
      accessoryLeft={renderStartIcon()}
      appearance={Appearance.filled}
      size="medium"
      style={{ ...styles.common, ...style }}
      onPressOut={onPressOut}
      {...rest}
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
