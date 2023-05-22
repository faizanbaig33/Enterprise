// Global
import { Story, Meta } from '@storybook/react';
// Local
import Form, { FormProps } from './Form';
import defaultData from './Form.mock-data';
import multiStepData from './Form.mock-data-multistep';

export default {
  title: 'Forms/Form',
  component: Form,
} as Meta;
const Template: Story<FormProps> = (props) => <Form {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;

export const multistep = Template.bind({});
multistep.args = multiStepData;
