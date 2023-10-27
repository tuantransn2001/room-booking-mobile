/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/extensions */
import React from "react";
import ActionSheetWrapper from "@shared-components/action-sheet-wrapper/ActionSheetWrapper";
import { ButtonWrapper } from "@shared-components/button-wrapper/ButtonWrapper";
import { InputType } from "@shared-components/form-wrapper/shared/FormWrapper.enum";
import { View } from "react-native";
import Section from "../../../shared/components/section-wrapper/SectionWrapper";
import { paymentMethods } from "../mock/mock";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import TextWrapper from "@shared-components/text-wrapper/TextWrapper";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { IFormData } from "@shared-components/form-wrapper/shared/FormWrapper.interface";
import FormWrapper from "@shared-components/form-wrapper/FormWrapper";
import AddCardDetail, { UserChoose } from "./addCardDetail/AddCardDetail";

const Payment = () => {
  const [visibleCoupon, setVisibleCoupon] = React.useState<boolean>(false);
  const [visibleAddCard, setVisibleAddCard] = React.useState<boolean>(false);
  const [userChoose, setUserChoose] = React.useState<UserChoose>(
    UserChoose.register,
  );

  const handleToggleCoupon = () => setVisibleCoupon(!visibleCoupon);
  const handleToggleAddCard = () => setVisibleAddCard(!visibleAddCard);

  const renderCouponForm = () => {
    const fields: IFormData[] = [
      {
        fieldName: "code",
        label: "",
        placeholder: "Enter your coupon",
        type: InputType.TEXT,
        errorText: "Invalid coupon code",
      },
    ];
    const handleSubmit = (data: any) => console.log(data);
    return (
      <FormWrapper data={fields} onSubmit={handleSubmit} submitAction="Apply" />
    );
  };

  const handleOnVisible = (userChoose: UserChoose) => {
    setUserChoose(userChoose);
    handleToggleAddCard();
  };

  return (
    <>
      <AddCardDetail
        choose={userChoose}
        visible={visibleAddCard}
        setVisible={setVisibleAddCard}
      />
      <Section title="Pay with">
        <View>
          <ActionSheetWrapper
            title="Enter coupon"
            visible={visibleCoupon}
            onClose={handleToggleCoupon}
          >
            {renderCouponForm()}
          </ActionSheetWrapper>
        </View>
        <View>
          {paymentMethods.map(({ icon, content, userChoose }, i) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                key={i}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <FontAwesomeIcon size={18} icon={icon} />
                  <TextWrapper bold h4>
                    {content}
                  </TextWrapper>
                </View>
                <ButtonWrapper
                  onPress={() => handleOnVisible(userChoose as UserChoose)}
                  StartIcon={faPlus}
                  link
                />
              </View>
            );
          })}
        </View>
        <View>
          <ButtonWrapper onPress={handleToggleCoupon} primary>
            Enter your coupon
          </ButtonWrapper>
        </View>
      </Section>
    </>
  );
};
export default Payment;
