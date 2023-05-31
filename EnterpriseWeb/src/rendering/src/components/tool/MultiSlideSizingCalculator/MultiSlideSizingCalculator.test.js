// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import MultiSlideSizingCalculator from './MultiSlideSizingCalculator';
import defaultData from './MultiSlideSizingCalculator.mock-data';

it('renders correctly', () => {
  const component = snapshot(MultiSlideSizingCalculator, { componentProps: defaultData });
  hasDataComponent(component, 'tool/multislidesizingcalculator');
});
