// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import PageMashup from './PageMashup';
import imagesForAllData from './PageMashup.mock-data-images-for-all';

it('renders correctly', () => {
  const component = snapshot(PageMashup, { componentProps: imagesForAllData });
  hasDataComponent(component, 'general/pagemashup');
});
