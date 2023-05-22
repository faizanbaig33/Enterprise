// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import PromoFeaturedMedia from './PromoFeaturedMedia';
import defaultData from './PromoFeaturedMedia.mock-data';
import blackData from './PromoFeaturedMedia.mock-data-black';
import grayData from './PromoFeaturedMedia.mock-data-gray';
import videoData from './PromoFeaturedMedia.mock-data-video';

it('renders correctly', () => {
  const component = snapshot(PromoFeaturedMedia, { componentProps: defaultData });
  hasDataComponent(component, 'promo/promofeaturedmedia');
});

it('black renders correctly', () => {
  const component = snapshot(PromoFeaturedMedia, { componentProps: blackData });
  hasDataComponent(component, 'promo/promofeaturedmedia');
});

it('gray renders correctly', () => {
  const component = snapshot(PromoFeaturedMedia, { componentProps: grayData });
  hasDataComponent(component, 'promo/promofeaturedmedia');
});

it('video renders correctly', () => {
  const component = snapshot(PromoFeaturedMedia, { componentProps: videoData });
  hasDataComponent(component, 'promo/promofeaturedmedia');
});
