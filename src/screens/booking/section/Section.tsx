import React, { PropsWithChildren } from "react";
import createStyle from "../BookingScreen.style";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import { View } from "react-native";

interface SectionProps extends PropsWithChildren {
  title: string;
}

const Section = ({ title, children }: SectionProps) => {
  const styles = React.useMemo(() => createStyle(), []);
  return (
    <View style={styles.section}>
      <TextWrapper bold h4>
        {title}
      </TextWrapper>
      {children}
    </View>
  );
};

export default Section;
