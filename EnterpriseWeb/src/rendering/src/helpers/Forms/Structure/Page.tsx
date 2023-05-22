import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import React from 'react';
import { FormFieldProps } from 'lib/forms/FormFieldProps';
import { fieldFactory } from 'temp/formFactory';

export type PageProps = Feature.EnterpriseWeb.Forms.Fields.Page &
  FormFieldProps & {
    classes: string;
  };

const Page = (props: PageProps) => {
  if (!props.fields) {
    return <></>;
  }

  return (
    <div className={props.classes}>
      {props.fields?.children.map((child: FormFieldProps) => {
        return fieldFactory(child);
      })}
    </div>
  );
};

export default Page;
