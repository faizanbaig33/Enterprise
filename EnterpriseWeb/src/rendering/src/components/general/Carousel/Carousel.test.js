// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
import 'lib/jest/match-media-mock';
// Local
import Carousel from './Carousel';
import defaultData from './Carousel.mock-data';

it('renders correctly', () => {
  const component = snapshot(Carousel, { componentProps: defaultData });
  hasDataComponent(component, 'general/carousel');
});
