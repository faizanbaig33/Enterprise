// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import AWHeader from './AWHeader';
import defaultData from './AWHeader.mock-data';

it('renders correctly', () => {
  const component = snapshot(AWHeader, { componentProps: defaultData });
  hasDataComponent(component, 'site/awheader');
});
