// Global
import { Story, Meta } from '@storybook/react';
// Local
import MultiGlideSizingCalculator, {
  MultiGlideSizingCalculatorProps,
} from './MultiGlideSizingCalculator';
import defaultData from './MultiGlideSizingCalculator.mock-data';

export default {
  title: 'Tool/MultiGlideSizingCalculator',
  component: MultiGlideSizingCalculator,
} as Meta;
const Template: Story<MultiGlideSizingCalculatorProps> = (props) => (
  <MultiGlideSizingCalculator {...props} />
);
export const Default = Template.bind({});
Default.args = defaultData;
