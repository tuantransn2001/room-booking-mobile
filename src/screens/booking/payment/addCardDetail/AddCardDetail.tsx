/* eslint-disable import/extensions */
import React from "react";
// import createStyle from "./AddCardDetail.style";
import { IFormData } from "@shared-components/form-wrapper/shared/FormWrapper.interface";
import ActionSheetWrapper from "@shared-components/action-sheet-wrapper/ActionSheetWrapper";
import FormWrapper from "@shared-components/form-wrapper/FormWrapper";
import { InputType } from "@shared-components/form-wrapper/shared/FormWrapper.enum";
import { SetState } from "shared/type/common";

export enum UserChoose {
  register = "1",
  add = "2",
}

interface AddCardDetailProps {
  choose: UserChoose;
  visible: boolean;
  setVisible: SetState<boolean>;
}

const AddCardDetail = ({
  choose = UserChoose.register,
  visible,
  setVisible,
}: AddCardDetailProps) => {
  // const styles = React.useMemo(() => createStyle(), []);

  const cardNumberFields: IFormData[] = [
    // Card detail
    {
      fieldName: "cardNum",
      label: "",
      placeholder: "Card number",
      errorText: "",
      type: InputType.TEXT,
    },
    {
      fieldName: "expiration",
      label: "",
      placeholder: "29/2/2030",
      errorText: "",
      type: InputType.TEXT,
    },
    {
      fieldName: "cvv",
      label: "",
      placeholder: "CVV",
      errorText: "",
      type: InputType.TEXT,
    },
    {
      fieldName: "postCode",
      label: "",
      placeholder: "postCode",
      errorText: "",
      type: InputType.TEXT,
    },
    {
      fieldName: "country",
      label: "",
      placeholder: "country",
      errorText: "",
      type: InputType.TEXT,
    }, // Dropdown
  ];

  const paypalFields: IFormData[] = [
    {
      fieldName: "cardNum",
      label: "",
      placeholder: "Card number",
      errorText: "",
      type: InputType.TEXT,
    },
  ];

  const handleChooseFieldOnUserChoose = () => {
    if (choose === UserChoose.register) return cardNumberFields;
    return paypalFields;
  };

  const handleSubmit = (data: any) => console.log({ data });

  return (
    <>
      <ActionSheetWrapper
        title="Add card details"
        visible={visible}
        onClose={() => setVisible(!visible)}
      >
        <FormWrapper
          data={handleChooseFieldOnUserChoose()}
          onSubmit={handleSubmit}
        />
      </ActionSheetWrapper>
    </>
  );
};
export default AddCardDetail;
