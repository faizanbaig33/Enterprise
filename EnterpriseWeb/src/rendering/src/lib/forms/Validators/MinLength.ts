import { ValidationResult } from '../FormValidators';

const MinLength = (props: any, value: string): ValidationResult => {
  if (
    Number.isInteger(props.fields?.minLength?.value) &&
    value?.length < props.fields.minLength.value
  )
    return {
      valid: false,
      errorMessage: `${props.fields?.label?.value} has a minimum length of ${props.fields.minLength.value} characters`,
    };
  else return { valid: true, errorMessage: null };
};

export default MinLength;
