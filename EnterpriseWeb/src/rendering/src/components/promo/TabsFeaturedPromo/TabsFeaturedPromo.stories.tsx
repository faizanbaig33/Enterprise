// Global
import { Story, Meta } from '@storybook/react';
// Local
import TabsFeaturedPromo, { TabsFeaturedPromoProps } from './TabsFeaturedPromo';
import defaultData from './TabsFeaturedPromo.mock-data';

export default {
  title: 'Promo/TabsFeaturedPromo',
  component: TabsFeaturedPromo,
} as Meta;
const Template: Story<TabsFeaturedPromoProps> = (props) => <TabsFeaturedPromo {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
