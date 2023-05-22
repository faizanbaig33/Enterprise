import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import React from 'react';
import { FormFieldProps } from 'lib/forms/FormFieldProps';
import BaseTextField from './BaseTextField';

export type ShortTextProps = Feature.EnterpriseWeb.Forms.Fields.ShortText & FormFieldProps;

const ShortText = (props: ShortTextProps): JSX.Element => {
  return <BaseTextField {...props} />;
};

export default ShortText;
