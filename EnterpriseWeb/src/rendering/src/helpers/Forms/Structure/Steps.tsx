import React, { Fragment, useContext } from 'react';
import { FormFieldProps } from 'lib/forms/FormFieldProps';
import classNames from 'classnames';
import { FormsContext } from 'lib/forms/FormContext';
import { FormStructureTheme } from './FormStructure.Theme';
import { useTheme } from 'lib/context/ThemeContext';

export type StepsProps = {
  steps: FormFieldProps[];
  classes?: string;
};

const Steps = (props: StepsProps) => {
  const { pageIndex } = useContext(FormsContext);
  const { themeData } = useTheme(FormStructureTheme());

  if (!props.steps) {
    return <></>;
  }

  return (
    <div className={classNames(themeData.classes.steps, props.classes)}>
      {props.steps?.map((step: FormFieldProps, index: number) => {
        return (
          <span
            key={index}
            className={classNames(
              themeData.classes.step.common,
              index <= pageIndex ? themeData.classes.step.active : themeData.classes.step.inactive
            )}
          >
            {step.fields?.label?.value}
          </span>
        );
      })}
    </div>
  );
};

export default Steps;
