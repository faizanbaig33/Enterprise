import { Validators } from './FormValidators';

/**
 * Represents the components of a HTML form field
 */
export type FormFieldProps = {
  name: string;
  id: string;
  fields: any;
  templateId: string;
  templateName: string;
  displayName: string;
  validators?: Validators[];
};
