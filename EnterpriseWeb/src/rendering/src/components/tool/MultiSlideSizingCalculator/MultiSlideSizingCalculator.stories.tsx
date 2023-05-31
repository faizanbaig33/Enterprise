// Global
import { Story, Meta } from '@storybook/react';
// Local
import MultiSlideSizingCalculator, {
  MultiSlideSizingCalculatorProps,
} from './MultiSlideSizingCalculator';
import defaultData from './MultiSlideSizingCalculator.mock-data';

export default {
  title: 'Tool/MultiSlideSizingCalculator',
  component: MultiSlideSizingCalculator,
} as Meta;
const Template: Story<MultiSlideSizingCalculatorProps> = (props) => (
  <MultiSlideSizingCalculator {...props} />
);
export const Default = Template.bind({});
Default.args = defaultData;
