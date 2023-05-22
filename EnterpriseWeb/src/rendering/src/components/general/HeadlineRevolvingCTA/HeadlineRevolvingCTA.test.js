// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
import 'lib/jest/match-media-mock';
// Local
import HeadlineRevolvingCTA from './HeadlineRevolvingCTA';
import defaultData from './HeadlineRevolvingCTA.mock-data';

it('renders correctly', () => {
  const component = snapshot(HeadlineRevolvingCTA, { componentProps: defaultData });
  hasDataComponent(component, 'general/headlinerevolvingcta');
});
