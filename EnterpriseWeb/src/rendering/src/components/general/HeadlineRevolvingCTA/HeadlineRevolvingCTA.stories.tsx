// Global
import { Story, Meta } from '@storybook/react';
// Local
import HeadlineRevolvingCTA, { HeadlineRevolvingCTAProps } from './HeadlineRevolvingCTA';
import defaultData from './HeadlineRevolvingCTA.mock-data';

export default {
  title: 'General/HeadlineRevolvingCTA',
  component: HeadlineRevolvingCTA,
} as Meta;
const Template: Story<HeadlineRevolvingCTAProps> = (props) => <HeadlineRevolvingCTA {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
