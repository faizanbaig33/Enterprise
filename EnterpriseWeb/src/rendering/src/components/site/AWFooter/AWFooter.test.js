// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import AWFooter from './AWFooter';
import defaultData from './AWFooter.mock-data';

it('renders correctly', () => {
  const component = snapshot(AWFooter, { componentProps: defaultData });
  hasDataComponent(component, 'site/awfooter');
});
