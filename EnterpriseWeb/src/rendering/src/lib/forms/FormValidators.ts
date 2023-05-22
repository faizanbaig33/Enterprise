import { validationFactory } from 'temp/formFactory';

export type ValidationResult = {
  valid: boolean;
  errorMessage: string | null;
};

export type Validators = 'Required' | 'MinLength' | 'MaxLength' | 'IsEmail';

export const Validate = (validators: Validators[], props: any, value: string): ValidationResult => {
  let validationResult: ValidationResult = { valid: true, errorMessage: null };
  for (const validatorIndex in validators) {
    const validate = validationFactory(validators[validatorIndex]);
    if (validate) validationResult = validate(props, value);
    if (!validationResult.valid) break;
  }
  return validationResult;
};
