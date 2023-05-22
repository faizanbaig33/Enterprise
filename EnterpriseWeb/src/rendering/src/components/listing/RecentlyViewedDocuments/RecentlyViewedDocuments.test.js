// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import RecentlyViewedDocuments from './RecentlyViewedDocuments';
import defaultData from './RecentlyViewedDocuments.mock-data';

it('renders correctly', () => {
  const component = snapshot(RecentlyViewedDocuments, { componentProps: defaultData });
  hasDataComponent(component, 'listing/recentlyvieweddocuments');
});
