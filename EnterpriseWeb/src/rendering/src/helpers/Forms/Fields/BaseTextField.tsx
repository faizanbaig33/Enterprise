import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { FormFieldProps } from 'lib/forms/FormFieldProps';
import { FormFieldsTheme } from './FormFields.Theme';
import { useTheme } from 'lib/context/ThemeContext';
import { FieldState, FormsContext } from 'lib/forms/FormContext';
import classNames from 'classnames';
import { Validate, ValidationResult, Validators } from 'lib/forms/FormValidators';

export type InputType = 'text' | 'textarea';

export type BaseTextFieldProps = Feature.EnterpriseWeb.Forms.Fields.ShortText &
  FormFieldProps &
  Feature.EnterpriseWeb.Forms.Fields.LongText & {
    inputType?: InputType;
  };

const BaseTextField = (props: BaseTextFieldProps): JSX.Element => {
  const { themeData } = useTheme(FormFieldsTheme());
  const { fieldStates, setFieldStates } = useContext(FormsContext);
  const [validation, setValidation] = useState({
    valid: true,
    errorMessage: null,
  } as ValidationResult);
  const fieldStatesRef = useRef<Record<string, FieldState>>();
  fieldStatesRef.current = fieldStates; // allows reference to current state of fieldStates

  const inputType: InputType = props.inputType || 'text';

  useEffect(() => {
    setFieldStates((prevState) => {
      return {
        ...prevState,
        [props.name]: { value: props.fields?.defaultValue?.value, validator: validate } as Record<
          string,
          FieldState
        >,
      };
    });
  }, []);

  if (!props.fields) {
    return <></>;
  }

  const handleFieldChange = (event: any) => {
    setFieldStates({
      ...fieldStates,
      [props.name]: { value: event.target.value, validator: validate } as Record<
        string,
        FieldState
      >,
    });
  };

  const commonValidators: Validators[] = ['Required', 'MinLength', 'MaxLength'];
  const validators = props.validators
    ? props.validators.concat(commonValidators)
    : commonValidators;

  const validate = (): boolean => {
    const validationResult = Validate(
      validators,
      props,
      fieldStatesRef.current ? (fieldStatesRef.current[props.name]?.value as string) : ''
    );
    setValidation(validationResult);
    return validationResult.valid;
  };

  return (
    <div className="relative mb-s" data-te-input-wrapper-init>
      <label className={themeData.classes.label} htmlFor={props.id}>
        {props.fields?.label.value} {props.fields?.required?.value ? '*' : ''}
      </label>
      {inputType === 'text' && (
        <input
          className={classNames(
            themeData.classes.input,
            !validation.valid ? themeData.classes.errorOutline : ''
          )}
          type="text"
          id={props.id}
          name={props.name}
          value={fieldStates[props.name]?.value || ''}
          onChange={handleFieldChange}
          required={props.fields?.required?.value}
          minLength={props.fields?.minLength?.value}
          maxLength={props.fields?.maxLength?.value}
          placeholder={props.fields?.placeholderText?.value}
          onBlur={validate}
        />
      )}
      {inputType === 'textarea' && (
        <textarea
          className={classNames(
            'peer',
            themeData.classes.textarea,
            !validation.valid ? themeData.classes.errorOutline : ''
          )}
          id={props.id}
          name={props.name}
          value={fieldStates[props.name]?.value || ''}
          onChange={handleFieldChange}
          required={props.fields?.required?.value}
          rows={props.fields?.rows?.value}
          minLength={props.fields?.minLength?.value}
          maxLength={props.fields?.maxLength?.value}
          placeholder={props.fields?.placeholderText?.value}
          onBlur={validate}
        />
      )}
      {!validation.valid && (
        <span className={themeData.classes.errorText}>{validation.errorMessage}</span>
      )}
    </div>
  );
};

export default BaseTextField;
