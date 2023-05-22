// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import Split2575 from './Split2575';
import defaultData from './Split2575.mock-data';

it('renders correctly', () => {
  const component = snapshot(Split2575, { componentProps: defaultData });
  // hasDataComponent(component, '/layout/split2575');
});
