// Global
import { Story, Meta } from '@storybook/react';
// Local
import PromoFlipsnackViewer, { PromoFlipsnackViewerProps } from './PromoFlipsnackViewer';
import defaultData from './PromoFlipsnackViewer.mock-data';

export default {
  title: 'Promo/PromoFlipsnackViewer',
  component: PromoFlipsnackViewer,
} as Meta;
const Template: Story<PromoFlipsnackViewerProps> = (props) => <PromoFlipsnackViewer {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
