import React, { useContext } from 'react';
import { FormFieldProps } from 'lib/forms/FormFieldProps';
import { FormsContext } from 'lib/forms/FormContext';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { getEnum } from 'lib/utils';
import { isPageValid } from 'lib/forms/FormActions';

export type ButtonProps = Feature.EnterpriseWeb.Forms.Fields.Button & FormFieldProps;

const Button = (props: ButtonProps) => {
  const { pageIndex, setPageIndex, fieldStates, formProps } = useContext(FormsContext);

  if (!props.fields) {
    return <></>;
  }

  const navigationStep = Number(getEnum<number>(props.fields?.navigationStep) || 0);

  return (
    <div className="relative mb-s">
      <button
        type={navigationStep === 0 || props.fields?.children?.length > 0 ? 'submit' : 'button'}
        name={props.name}
        onClick={() => {
          if (
            navigationStep < 0 ||
            (navigationStep > 0 && isPageValid(formProps, pageIndex, fieldStates))
          )
            setPageIndex(pageIndex + navigationStep);
        }}
      >
        {props.fields?.label?.value}
      </button>
    </div>
  );
};

export default Button;
