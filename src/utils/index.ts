/* eslint-disable camelcase */
import * as NavigationServices from "react-navigation-helpers";

export const handleNavigate = (href: string, params?: Record<string, any>) => {
  if (!href) return;
  NavigationServices.push(href, params);
};

export const goBack = () => {
  console.log("back");
  NavigationServices.goBack();
};

export const capitalizeFirstLetter = (str: string) => {
  return str && str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};

export const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

export const extractToken = (tokens: string) => {
  if (!tokens) return {};
  const [access_token] = tokens.split(" ");

  return { token_type: "Bearer", access_token };
};

export const handleCalcRangeBetweenTwoDate = (
  startDate: Date,
  endDate: Date,
) => {
  const timeDifference = endDate.getTime() - startDate.getTime();

  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  return daysDifference;
};
