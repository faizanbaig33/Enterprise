import { withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import classNames from 'classnames';
import { ComponentProps } from 'lib/component-props';
import { FormFieldProps } from 'lib/forms/FormFieldProps';
import { FormEvent, useState } from 'react';
import Page from 'src/helpers/Forms/Structure/Page';
import Steps from 'src/helpers/Forms/Structure/Steps';
import { FieldState, FormsContext } from 'lib/forms/FormContext';
import { FormTheme } from './Form.Theme';
import { useTheme } from 'lib/context/ThemeContext';
import { translateFieldMappings, isFormValid } from 'lib/forms/FormActions';

export type FormProps = ComponentProps & {
  fields: {
    children: Array<FormFieldProps>;
  };
  classes?: string;
};

const Form = (props: FormProps): JSX.Element => {
  const [pageIndex, setPageIndex] = useState(0);
  const { themeData } = useTheme(FormTheme());

  const [fieldStates, setFieldStates] = useState({} as Record<string, FieldState>);

  if (!props.fields) {
    return <></>;
  }

  const handleSubmit = (e: FormEvent) => {
    // Prevent the browser from reloading the page
    e.preventDefault();
    if (isFormValid(fieldStates)) {
      const formModel = translateFieldMappings(props, fieldStates);
      console.log(formModel);
      console.log('submitted');
    }
  };

  const steps = props.fields?.children.filter((x) => x.fields?.includeInSteps?.value);

  return (
    <FormsContext.Provider
      value={{ pageIndex, setPageIndex, fieldStates, setFieldStates, formProps: props }}
    >
      <div className={classNames(themeData.classes.form, props.classes)}>
        <form onSubmit={handleSubmit} noValidate>
          {steps.length > 1 && <Steps steps={steps} />}
          <div className="pages">
            {props.fields?.children.map((child: FormFieldProps, index: number) => {
              return <Page {...child} key={index} classes={index === pageIndex ? '' : 'hidden'} />;
            })}
          </div>
        </form>
      </div>
    </FormsContext.Provider>
  );
};

export default withDatasourceCheck()<FormProps>(Form);
