import { ValidationResult } from '../FormValidators';

const MaxLength = (props: any, value: string): ValidationResult => {
  if (
    Number.isInteger(props.fields?.maxLength?.value) &&
    value?.length > props.fields.maxLength.value
  )
    return {
      valid: false,
      errorMessage: `${props.fields?.label?.value} has a maximum length of ${props.fields.maxLength.value} characters`,
    };
  else return { valid: true, errorMessage: null };
};

export default MaxLength;
