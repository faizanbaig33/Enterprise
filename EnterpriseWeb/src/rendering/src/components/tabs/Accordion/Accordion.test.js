// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import Accordion from './Accordion';
import defaultData from './Accordion.mock-data';

it('renders correctly', () => {
  const component = snapshot(Accordion, { componentProps: defaultData });
  hasDataComponent(component, 'tabs/accordion');
});
