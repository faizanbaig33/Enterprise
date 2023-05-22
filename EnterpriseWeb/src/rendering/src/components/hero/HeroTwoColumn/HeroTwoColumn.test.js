// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import HeroTwoColumn from './HeroTwoColumn';
import defaultData from './HeroTwoColumn.mock-data';

it('renders correctly', () => {
  const component = snapshot(HeroTwoColumn, { componentProps: defaultData });
  hasDataComponent(component, 'hero/herotwocolumn');
});
