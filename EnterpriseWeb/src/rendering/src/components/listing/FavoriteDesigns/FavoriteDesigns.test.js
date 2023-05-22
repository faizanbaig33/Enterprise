// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
import 'lib/jest/match-media-mock';
// Local
import FavoriteDesigns from './FavoriteDesigns';
import defaultData from './FavoriteDesigns.mock-data';

it('renders correctly', () => {
  const component = snapshot(FavoriteDesigns, { componentProps: defaultData });
  hasDataComponent(component, 'general/favoritedesigns');
});
