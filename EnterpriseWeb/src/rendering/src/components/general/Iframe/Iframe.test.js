// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import Iframe from './Iframe';
import defaultData from './Iframe.mock-data';

it('renders correctly', () => {
  const component = snapshot(Iframe, { componentProps: defaultData });
  hasDataComponent(component, 'general/iframe');
});
