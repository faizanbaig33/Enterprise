import { Story, Meta } from '@storybook/react';

// Local
import SectionHeadline, { SectionHeadlineProps } from './SectionHeadline';
import defaultData from './SectionHeadline.mock-data';

export default {
  title: 'General/SectionHeadline',
  component: SectionHeadline,
} as Meta;

const Template: Story<SectionHeadlineProps> = (props) => <SectionHeadline {...props} />;

export const Default = Template.bind({});
Default.args = defaultData;
