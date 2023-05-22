import { FormProps } from 'components/forms/Form/Form';
import { getEnum } from 'lib/utils';
import { FieldState } from './FormContext';
import { FormFieldProps } from './FormFieldProps';

export const translateFieldMappings = (
  props: FormProps,
  fieldStates: Record<string, FieldState>
): Record<string, any> => {
  const formModel: Record<string, any> = {};
  props.fields?.children.forEach((page) => {
    page.fields?.children.forEach((field: FormFieldProps) => {
      if (!!fieldStates[field.name] && !!fieldStates[field.name].value) {
        const fieldMapping = getEnum<string>(field.fields?.fieldMapping);
        if (!!fieldMapping) {
          formModel[fieldMapping] = fieldStates[field.name].value;
        } else {
          formModel[field.name] = fieldStates[field.name].value;
        }
      }
    });
  });
  return formModel;
};

export const isFormValid = (fieldStates: Record<string, FieldState>): boolean => {
  let formIsValid = true;
  for (const key in fieldStates) {
    const validator = fieldStates[key].validator;
    if (validator && validator() === false) formIsValid = false;
  }
  return formIsValid;
};

export const isPageValid = (
  formProps: FormProps,
  pageIndex: number,
  fieldStates: Record<string, FieldState>
): boolean => {
  let pageIsValid = true;
  const page = formProps.fields?.children[pageIndex];
  if (page) {
    page.fields?.children.forEach((field: FormFieldProps) => {
      const validator = fieldStates[field.name]?.validator;
      if (validator && validator() === false) pageIsValid = false;
    });
  }
  return pageIsValid;
};
