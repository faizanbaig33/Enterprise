// Global
import { Story, Meta } from '@storybook/react';
// Local
import TestForm, { TestFormProps } from './TestForm';
import defaultData from './TestForm.mock-data';

export default {
  title: 'Forms/TestForm',
  component: TestForm,
} as Meta;
const Template: Story<TestFormProps> = (props) => <TestForm {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
