import { FormProps } from 'components/forms/Form/Form';
import { createContext, Dispatch, SetStateAction } from 'react';

export type FieldState = {
  value?: string;
  validator?: () => boolean;
};

export type FormStateProps = {
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
  fieldStates: Record<string, FieldState>;
  setFieldStates: Dispatch<SetStateAction<Record<string, FieldState>>>;
  formProps: FormProps;
};

export const FormsContext = createContext<FormStateProps>({} as FormStateProps);
