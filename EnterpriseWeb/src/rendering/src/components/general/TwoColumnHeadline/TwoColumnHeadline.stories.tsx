import { Story, Meta } from '@storybook/react';

// Local
import TwoColumnHeadline, { TwoColumnHeadlineProps } from './TwoColumnHeadline';
import defaultData from './TwoColumnHeadline.mock-data';

export default {
  title: 'General/TwoColumnHeadline',
  component: TwoColumnHeadline,
} as Meta;

const Template: Story<TwoColumnHeadlineProps> = (props) => <TwoColumnHeadline {...props} />;

export const Default = Template.bind({});
Default.args = defaultData;
