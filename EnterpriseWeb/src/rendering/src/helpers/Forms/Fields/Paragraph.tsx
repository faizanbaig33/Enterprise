import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import React, { Fragment } from 'react';
import { RichTextWrapper } from 'src/helpers/RichTextWrapper';
import { FormFieldProps } from 'lib/forms/FormFieldProps';

export type ParagraphProps = Feature.EnterpriseWeb.Forms.Fields.Paragraph & FormFieldProps;

const Paragraph = (props: ParagraphProps) => {
  if (!props.fields) {
    return <></>;
  }

  return (
    <div className="relative mb-s">
      <RichTextWrapper field={props.fields?.text} />
    </div>
  );
};

export default Paragraph;
