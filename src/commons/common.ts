import * as randomstring from "randomstring";
import { Falsy, ObjectLiteral } from "shared/type/common";

export const isEmpty = (target: ObjectLiteral | any[] | Falsy): boolean => {
  if (!target) return false;

  if (target instanceof Array) return target.length === 0;

  if (target instanceof Object) return Object.keys(target).length === 0;

  return false;
};

export const randomStringByCharsetAndLength = (
  charset: string,
  length: number,
  isUppercase: boolean,
): string => {
  return randomstring.generate({
    charset: charset,
    length: length,
    capitalization: isUppercase ? "uppercase" : "lowercase",
  });
};

export const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const handleGenerateRandomCode = () =>
  randomStringByCharsetAndLength("alphabetic", 5, true) +
  randomStringByCharsetAndLength("numeric", 2, true);
