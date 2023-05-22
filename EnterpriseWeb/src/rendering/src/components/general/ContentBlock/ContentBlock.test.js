// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import ContentBlock from './ContentBlock';
import defaultData from './ContentBlock.mock-data-center';

it('renders correctly', () => {
  const component = snapshot(ContentBlock, { componentProps: defaultData });
  hasDataComponent(component, 'general/contentblock');
});
