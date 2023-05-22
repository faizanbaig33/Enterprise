import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import React from 'react';
import { FormFieldProps } from 'lib/forms/FormFieldProps';
import BaseTextField from './BaseTextField';

export type LongTextProps = Feature.EnterpriseWeb.Forms.Fields.LongText & FormFieldProps;

const LongText = (props: LongTextProps): JSX.Element => {
  return <BaseTextField {...props} inputType="textarea" />;
};

export default LongText;
