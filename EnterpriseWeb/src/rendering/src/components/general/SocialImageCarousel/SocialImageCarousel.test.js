// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import SocialImageCarousel from './SocialImageCarousel';
import { inlineData } from './SocialImageCarousel.mock-data';

it('renders correctly', () => {
  const component = snapshot(SocialImageCarousel, { componentProps: inlineData });
  hasDataComponent(component, 'general/socialimagecarousel');
});
