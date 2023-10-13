/* eslint-disable import/extensions */
import { IFormData } from "@shared-components/form-wrapper/shared/FormWrapper.interface";
export interface InputProps extends Partial<IFormData> {
  onChange: () => void;
  onBlur: () => void;
  value: string;
}
