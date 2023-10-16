import React, { PropsWithChildren } from "react";
import { faAngleLeft, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import createStyle from "./BookingScreen.style";
import { Image, Pressable, SafeAreaView, ScrollView, View } from "react-native";
import { Layout, ViewPager } from "@ui-kitten/components";
import { cards } from "@screens/explore/mocks/data";
import { ButtonWrapper } from "@shared-components/button-wrapper/ButtonWrapper";
import { COLORS } from "@shared-constants";
import { Radio } from "native-base";

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

const BookingScreen = () => {
  const [value, setValue] = React.useState<string>("");
  const styles = React.useMemo(() => createStyle(), []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View
          style={{
            marginTop: 10,
            position: "relative",
          }}
        >
          <Pressable
            style={{
              position: "absolute",
              left: 20,
              top: 3,
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </Pressable>
          <TextWrapper center bold h4>
            Request to book
          </TextWrapper>
        </View>
        <View
          style={{
            width: "60%",
            paddingVertical: 24,
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "flex-start",
            gap: 20,
          }}
        >
          <View style={{ width: 150, height: 96 }}>
            <ViewPager selectedIndex={0} onSelect={() => console.log("data")}>
              <Layout
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
                level="2"
              >
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 12,
                  }}
                  source={cards[0].sliders[0]}
                />
              </Layout>
            </ViewPager>
          </View>

          <View
            style={{
              flexDirection: "column",
              gap: 6,
            }}
          >
            <TextWrapper h5>Entire rental unit</TextWrapper>
            <TextWrapper h5 bold>
              Lovely Studio with Burj Khalifa views from Balcony
            </TextWrapper>

            <View style={{ flexDirection: "row" }}>
              <FontAwesomeIcon icon={faStarHalfAlt} />
              <TextWrapper>4.7</TextWrapper>
            </View>
          </View>
        </View>
        <Section title="Your trip">
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextWrapper h4>Dates {"\n"}10-12</TextWrapper>
            <ButtonWrapper link>Edit</ButtonWrapper>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextWrapper h4>Guests{"\n"}4</TextWrapper>
            <ButtonWrapper link>Edit</ButtonWrapper>
          </View>
        </Section>

        <Section title="Choose how to pay">
          <Radio.Group
            style={{
              flexDirection: "column",
            }}
            name="myRadioGroup"
            accessibilityLabel="favorite number"
            value={value}
            onChange={(nextValue) => {
              setValue(nextValue);
            }}
          >
            <View
              style={{
                width: "100%",
                borderWidth: 1,
                borderColor: COLORS.DISABLE,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                padding: 10,
              }}
            >
              <Radio value="full" my={1}>
                <View
                  style={{
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <TextWrapper bold>Pay in full</TextWrapper>
                  <TextWrapper>
                    Pay the total ($1,198.38) now and {"\n"}you're all set.
                  </TextWrapper>
                </View>
              </Radio>
            </View>

            <View
              style={{
                width: "100%",
                borderWidth: 1,
                borderTopWidth: 0,
                borderColor: COLORS.DISABLE,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
                padding: 10,
              }}
            >
              <Radio value="part" my={1}>
                <View
                  style={{
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <TextWrapper bold>Pay part now, part later</TextWrapper>
                  <TextWrapper>
                    $652.48 due today, $545.90 on 3 Nov 2023. {"\n"}No extra
                    fees. More info
                  </TextWrapper>
                </View>
              </Radio>
            </View>
          </Radio.Group>
        </Section>

        <Section title="Price details">
          <View style={styles.row}>
            <TextWrapper h5>$196.57 USD x 5 nights</TextWrapper>
            <TextWrapper h5> $982.85 USD</TextWrapper>
          </View>
          <View style={styles.row}>
            <TextWrapper h5>Cleaning fee</TextWrapper>
            <TextWrapper h5>$54.45 USD</TextWrapper>
          </View>
          <View style={styles.row}>
            <TextWrapper h5>Airbnb service fee</TextWrapper>
            <TextWrapper h5>$161.08 USD</TextWrapper>
          </View>

          <View
            style={[
              styles.row,
              {
                paddingTop: 10,
                borderTopWidth: 1,
                borderTopColor: COLORS.DISABLE,
              },
            ]}
          >
            <TextWrapper h4>Total(USD):</TextWrapper>
            <TextWrapper h4>$1,198.38</TextWrapper>
          </View>
        </Section>
      </ScrollView>
      <View
        style={{
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
          backgroundColor: COLORS.WHITE,
          borderWidth: 1,
          borderColor: COLORS.DISABLE,
          padding: 20,
          flexDirection: "column",
          gap: 12,
        }}
      >
        <TextWrapper h6 left>
          By selecting the button below, I agree to the
          <TextWrapper bold> Host's House Rules</TextWrapper>, Ground rules for
          guests, Airbnb's Re-booking and Refund Policy, and that Airbnb can
          charge my payment method if I’m responsible for damage.
        </TextWrapper>
        <ButtonWrapper primary>Confirm and pay</ButtonWrapper>
      </View>
    </SafeAreaView>
  );
};
export default BookingScreen;
