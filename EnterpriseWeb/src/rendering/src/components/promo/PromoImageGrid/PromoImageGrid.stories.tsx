import { Story, Meta } from '@storybook/react';

// Local
import PromoImageGrid, { PromoImageGridProps } from './PromoImageGrid';
import defaultData from './PromoImageGrid.mock-data';
import withThreeImages from './PromoImageGrid.mock-data-3-images';
import withRightCopy from './PromoImageGrid.mock-data-right-copy';
import withCarousel from './PromoImageGrid.mock-data-carousel';

export default {
  title: 'Promo/Promo Image Grid',
  component: PromoImageGrid,
} as Meta;

const Template: Story<PromoImageGridProps> = (props) => <PromoImageGrid {...props} />;

export const Default = Template.bind({});
Default.args = defaultData;

export const WithThreeImages = Template.bind({});
WithThreeImages.args = withThreeImages;

export const WithRightCopy = Template.bind({});
WithRightCopy.args = withRightCopy;

export const WithCarousel = Template.bind({});
WithCarousel.args = withCarousel;
