import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import React, { useContext, useEffect } from 'react';
import { FormFieldProps } from 'lib/forms/FormFieldProps';
import { FieldState, FormsContext } from 'lib/forms/FormContext';

export type HiddenProps = Feature.EnterpriseWeb.Forms.Fields.Hidden & FormFieldProps;

const Hidden = (props: HiddenProps): JSX.Element => {
  const { fieldStates, setFieldStates } = useContext(FormsContext);

  useEffect(() => {
    setFieldStates((prevState) => {
      return {
        ...prevState,
        [props.name]: {
          value: props.fields?.defaultValue?.value,
          validator: null,
        } as unknown as Record<string, FieldState>,
      };
    });
  }, []);

  if (!props.fields) {
    return <></>;
  }

  return (
    <div className="relative mb-s" data-te-input-wrapper-init>
      <input
        type="hidden"
        id={props.id}
        name={props.name}
        value={fieldStates[props.name]?.value || ''}
        readOnly={true}
      />
    </div>
  );
};

export default Hidden;
