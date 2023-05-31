// Global
import { Story, Meta } from '@storybook/react';

// Local
import ESeriesSizingCalculator, { ESeriesSizingCalculatorProps } from './ESeriesSizingCalculator';
import defaultData from './ESeriesSizingCalculator.mock-data';

export default {
  title: 'Tool/ESeriesSizingCalculator',
  component: ESeriesSizingCalculator,
} as Meta;

const Template: Story<ESeriesSizingCalculatorProps> = (props) => (
  <ESeriesSizingCalculator {...props} />
);

export const Default = Template.bind({});
Default.args = defaultData;
