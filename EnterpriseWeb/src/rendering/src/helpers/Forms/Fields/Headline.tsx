import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import React, { Fragment } from 'react';
import { FormFieldProps } from 'lib/forms/FormFieldProps';
import { Headline as Heading } from 'src/helpers/Headline';
import { useTheme } from 'lib/context/ThemeContext';
import { FormFieldsTheme } from './FormFields.Theme';

export type HeadlineProps = Feature.EnterpriseWeb.Forms.Fields.Headline & FormFieldProps;

const Headline = (props: HeadlineProps) => {
  const { themeData } = useTheme(FormFieldsTheme());

  if (!props.fields) {
    return <></>;
  }

  return (
    <div className="relative mb-s">
      <Heading classes={themeData.classes.headline} {...props} />
    </div>
  );
};

export default Headline;
