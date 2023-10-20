import { ImageSourcePropType } from "react-native";

export interface ICardWrapper {
  id?: string | number;
  loading: boolean;
  sliders: ImageSourcePropType[];
  rateNumber: number;
  body: {
    title: string;
    contents: string[];
  };
}
