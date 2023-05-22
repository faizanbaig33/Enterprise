// Global
import { Story, Meta } from '@storybook/react';
// Local
import SocialImageCarousel, { SocialImageCarouselProps } from './SocialImageCarousel';
import { inlineData, stackData } from './SocialImageCarousel.mock-data';

export default {
  title: 'General/SocialImageCarousel',
  component: SocialImageCarousel,
} as Meta;

const Template: Story<SocialImageCarouselProps> = (props) => <SocialImageCarousel {...props} />;

export const Inline = Template.bind({});
Inline.args = inlineData;

export const Stack = Template.bind({});
Stack.args = stackData;
