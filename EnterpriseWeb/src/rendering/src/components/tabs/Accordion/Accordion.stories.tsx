// Global
import { Story, Meta } from '@storybook/react';
// Local
import Accordion, { AccordionProps } from './Accordion';
import defaultData from './Accordion.mock-data';

export default {
  title: 'Tabs/Accordion',
  component: Accordion,
} as Meta;
const Template: Story<AccordionProps> = (props) => <Accordion {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
