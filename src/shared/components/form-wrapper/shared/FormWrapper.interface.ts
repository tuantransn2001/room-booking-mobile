import { InputType } from "./FormWrapper.enum";

export interface IFormData {
  fieldName: string;
  label: string;
  placeholder: string;
  caption?: string;
  errorText?: string;
  type: InputType;
  rules?: Record<string, string | boolean>;
}
