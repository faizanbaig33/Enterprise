import { ComponentRendering, Placeholder } from '@sitecore-jss/sitecore-jss-react';
import { Feature } from 'src/.generated/Feature.EnterpriseWeb.model';
import { Component } from 'src/helpers/Component';

export type TestFormProps = Feature.EnterpriseWeb.Components.Forms.TestForm & {
  rendering: ComponentRendering;
};

const TestForm = (props: TestFormProps): JSX.Element => {
  return (
    <Component variant="lg" dataComponent="forms/testform" {...props}>
      <div className="col-span-12">
        <h1>Test Form</h1>
        <Placeholder name="form" rendering={props.rendering} />
      </div>
    </Component>
  );
};

export default TestForm;
