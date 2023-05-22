import { ValidationResult } from '../FormValidators';

const IsEmail = (props: any, value: string): ValidationResult => {
  if (value && !/\S+@\S+\.\S+/.test(value)) {
    return {
      valid: false,
      errorMessage: `${props.fields?.label?.value} is an invalid email format.`,
    };
  } else return { valid: true, errorMessage: null };
};

export default IsEmail;
