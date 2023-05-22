import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import React from 'react';
import { FormFieldProps } from 'lib/forms/FormFieldProps';

import BaseTextField from './BaseTextField';

export type EmailProps = Feature.EnterpriseWeb.Forms.Fields.Email & FormFieldProps;

const Email = (props: EmailProps): JSX.Element => {
  return <BaseTextField {...props} validators={['IsEmail']} />;
};

export default Email;
