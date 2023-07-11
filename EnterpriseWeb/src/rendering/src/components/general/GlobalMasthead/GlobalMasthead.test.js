// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
import 'lib/jest/match-media-mock';
// Local
import GlobalMasthead from './GlobalMasthead';
import defaultData from './GlobalMasthead.mock-data';

it('renders correctly', () => {
  const component = snapshot(GlobalMasthead, { componentProps: defaultData });
  hasDataComponent(component, 'global/globalmasthead');
});
