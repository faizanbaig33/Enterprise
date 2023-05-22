// Global
import { Story, Meta } from '@storybook/react';
// Local
import StickyBanner, { StickyBannerProps } from './StickyBanner';
import defaultData from './StickyBanner.mock-data';

export default {
  title: 'General/StickyBanner',
  component: StickyBanner,
} as Meta;
const Template: Story<StickyBannerProps> = (props) => <StickyBanner {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
