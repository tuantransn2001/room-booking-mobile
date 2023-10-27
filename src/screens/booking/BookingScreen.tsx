/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React from "react";
import {
  faAngleLeft,
  faCalendarCheck,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import createStyle from "./BookingScreen.style";
import { Image, Pressable, SafeAreaView, ScrollView, View } from "react-native";
import { Layout, ViewPager } from "@ui-kitten/components";
import { cards } from "@screens/explore/mocks/data";
import { ButtonWrapper } from "@shared-components/button-wrapper/ButtonWrapper";
import { COLORS } from "@shared-constants";
import { Radio, Select } from "native-base";
import DatePickerWrapper from "@shared-components/date-picker-wrapper/DatePickerWrapper";
import ActionSheetWrapper from "@shared-components/action-sheet-wrapper/ActionSheetWrapper";
import { useQuery } from "@apollo/client";
import { GET_HOTEL_BY_ID } from "graphql/query/GetHotelbyId";
import { NavigationRouteProps } from "shared/type/common";
import { handleCalcRangeBetweenTwoDate } from "utils";
import Confirm from "./confirm/Confirm";
import SectionWrapper from "../../shared/components/section-wrapper/SectionWrapper";
import Payment from "./payment/Payment";
import RequiredYourTrip from "./requiredYourTrip/RequiredYourTrip";

interface BookingScreenProps extends NavigationRouteProps<BookingScreenProps> {
  id?: number;
}

const BookingScreen = (props: BookingScreenProps) => {
  const [value, setValue] = React.useState<string>("");
  const [visible, setVisible] = React.useState<boolean>(false);
  const [room, pickRoom] = React.useState<number>(1);
  const [people, pickPeople] = React.useState<number>(1);
  const [checkIn, pickCheckIn] = React.useState<Date>(new Date());
  const [checkOut, pickCheckOut] = React.useState<Date>(new Date());
  const styles = React.useMemo(() => createStyle(), []);

  const handleToggleVisible = () => setVisible(!visible);
  const onClose = () => setVisible(!visible);

  const { data, loading } = useQuery(GET_HOTEL_BY_ID, {
    variables: {
      id: 1,
    },
  });

  // if (!props.route?.params) {
  //   handleNavigate(SCREENS.ERROR, {
  //     statusCode: 500,
  //   });
  // }

  return (
    <SafeAreaView style={styles.container}>
      <ActionSheetWrapper title="date" visible={visible} onClose={onClose}>
        <View style={{ flexDirection: "column", gap: 16 }}>
          <View style={{ flexDirection: "row", gap: 16 }}>
            <DatePickerWrapper
              date={checkIn}
              setDate={pickCheckIn}
              title="Check in"
            />
            <DatePickerWrapper
              date={checkOut}
              setDate={pickCheckOut}
              title="Check out"
            />
          </View>
          <View style={{ width: "100%" }}>
            <TextWrapper h5 bold>
              People
            </TextWrapper>
            <Select
              selectedValue={people.toString()}
              minWidth={200}
              minHeight={10}
              accessibilityLabel="People"
              placeholder="1"
              onValueChange={(itemValue) => pickPeople(+itemValue)}
              mt={1}
            >
              <Select.Item label="1" value="1" />
              <Select.Item label="2" value="2" />
              <Select.Item label="4" value="4" />
            </Select>
          </View>
          <View style={{ width: "100%" }}>
            <TextWrapper h5 bold>
              People
            </TextWrapper>
            <Select
              selectedValue={people.toString()}
              minWidth={200}
              minHeight={10}
              accessibilityLabel="Room"
              placeholder={data?.getHotelById.rooms[0].roomName ?? ""}
              onValueChange={(itemValue) => pickRoom(+itemValue)}
              mt={1}
            >
              {data?.getHotelById.rooms.map(
                ({
                  currentPrice,
                  roomName,
                  id,
                }: {
                  [key: string]: string | number;
                }) => (
                  <Select.Item
                    label={`${roomName} - ${currentPrice} $/night` as string}
                    value={id.toString()}
                    key={id}
                  />
                ),
              )}
            </Select>
          </View>
        </View>
      </ActionSheetWrapper>

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
        <SectionWrapper title="Your trip">
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextWrapper h4>
              Dates {"\n"}
              {handleCalcRangeBetweenTwoDate(checkIn, checkOut) <= 1
                ? 1
                : handleCalcRangeBetweenTwoDate(checkIn, checkOut) +
                  ` (${new Date(checkIn).getDate()} - ${new Date(
                    checkIn,
                  ).getDate()})`}
            </TextWrapper>
            <ButtonWrapper onPress={handleToggleVisible} link>
              Edit
            </ButtonWrapper>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextWrapper h4>
              Guests{"\n"} {people}
            </TextWrapper>
            <ButtonWrapper onPress={handleToggleVisible} link>
              Edit
            </ButtonWrapper>
          </View>
        </SectionWrapper>

        <SectionWrapper title="Choose how to pay">
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
        </SectionWrapper>

        <SectionWrapper title="Price details">
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
        </SectionWrapper>

        <Payment />

        <RequiredYourTrip />

        <SectionWrapper title="Cancellation policy">
          <TextWrapper>
            Free cancellation before 25 Otc.Cancel before check in on 25 Otc for
            partial refund. Learn more
          </TextWrapper>
        </SectionWrapper>

        <SectionWrapper>
          <View
            style={{ flexDirection: "row", alignItems: "flex-start", gap: 14 }}
          >
            <FontAwesomeIcon
              color={COLORS.PRIMARY}
              size={20}
              icon={faCalendarCheck}
            />
            <TextWrapper h5 bold left>
              Your reservation won't be accept confirm until {"\n"} the host
              accept your request(withing 24 hours).You won't be charge until
              then
            </TextWrapper>
          </View>
        </SectionWrapper>
      </ScrollView>
      <Confirm
        people={people}
        checkIn={checkIn}
        checkOut={checkOut}
        room={room}
      />
    </SafeAreaView>
  );
};
export default BookingScreen;
