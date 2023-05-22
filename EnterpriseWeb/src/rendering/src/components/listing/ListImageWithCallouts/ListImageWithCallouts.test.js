// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
import 'lib/jest/match-media-mock';
// Local
import ListImageWithCallouts from './ListImageWithCallouts';
import defaultData from './ListImageWithCallouts.mock-data';

it('renders correctly', () => {
  const component = snapshot(ListImageWithCallouts, { componentProps: defaultData });
  hasDataComponent(component, 'listing/listimagewithcallouts');
});
