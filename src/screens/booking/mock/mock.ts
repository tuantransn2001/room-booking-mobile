import { faPager } from "@fortawesome/free-solid-svg-icons";
import { UserChoose } from "../payment/addCardDetail/AddCardDetail";

export const paymentMethods = [
  {
    icon: faPager,
    content: "Creadit or debit card",
    userChoose: UserChoose.register,
  },
  {
    icon: faPager,
    content: "Paypal",
    userChoose: UserChoose.add,
  },
];
