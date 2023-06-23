// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import MultiGlideSizingCalculator from './MultiGlideSizingCalculator';
import defaultData from './MultiGlideSizingCalculator.mock-data';

it('renders correctly', () => {
  const component = snapshot(MultiGlideSizingCalculator, { componentProps: defaultData });
  hasDataComponent(component, 'tool/MultiGlideSizingCalculator');
});
