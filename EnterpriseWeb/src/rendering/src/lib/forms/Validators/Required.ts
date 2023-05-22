import { ValidationResult } from '../FormValidators';

const Required = (props: any, value: string): ValidationResult => {
  if (props.fields?.required?.value && (!value || value === ''))
    return { valid: false, errorMessage: `${props.fields?.label?.value} is required` };
  else return { valid: true, errorMessage: null };
};

export default Required;
