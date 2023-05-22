// Global
import { Story, Meta } from '@storybook/react';
// Local
import Carousel, { CarouselProps } from './Carousel';
import defaultData from './Carousel.mock-data';

export default {
  title: 'General/Carousel',
  component: Carousel,
} as Meta;
const Template: Story<CarouselProps> = (props) => <Carousel {...props} />;
export const Default = Template.bind({});
Default.args = defaultData;
