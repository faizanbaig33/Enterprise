// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
import 'lib/jest/match-media-mock';
// Local
import CuratedImageDisplay from './CuratedImageDisplay';
import defaultData from './CuratedImageDisplay.mock-data';

it('renders correctly', () => {
  const component = snapshot(CuratedImageDisplay, { componentProps: defaultData });
  hasDataComponent(component, 'general/curatedimagedisplay');
});
