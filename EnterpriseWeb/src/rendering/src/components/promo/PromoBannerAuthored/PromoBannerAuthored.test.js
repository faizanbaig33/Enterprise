// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import PromoBannerAuthored from './PromoBannerAuthored';
import defaultData from './PromoBannerAuthored.mock-data';
import withImageData from './PromoBannerAuthored.mock-data-with-image';
import rightAlignData from './PromoBannerAuthored.mock-data-right-align';
import withImageRightAlignData from './PromoBannerAuthored.mock-data-with-image-right-align';
import brandColorOutline from './PromoBannerAuthored.mock-data-brand-color-outline';
import blackSolid from './PromoBannerAuthored.mock-data-black-solid';
import blackOutline from './PromoBannerAuthored.mock-data-black-outline';

it('renders correctly', () => {
  const component = snapshot(PromoBannerAuthored, { componentProps: defaultData });
  hasDataComponent(component, 'promo/promobannerauthored');
});

it('with image renders correctly', () => {
  const component = snapshot(PromoBannerAuthored, { componentProps: withImageData });
  hasDataComponent(component, 'promo/promobannerauthored');
});

it('right align renders correctly', () => {
  const component = snapshot(PromoBannerAuthored, { componentProps: rightAlignData });
  hasDataComponent(component, 'promo/promobannerauthored');
});

it('with image right align renders correctly', () => {
  const component = snapshot(PromoBannerAuthored, { componentProps: withImageRightAlignData });
  hasDataComponent(component, 'promo/promobannerauthored');
});

it('brand color outline renders correctly', () => {
  const component = snapshot(PromoBannerAuthored, { componentProps: brandColorOutline });
  hasDataComponent(component, 'promo/promobannerauthored');
});

it('black solid renders correctly', () => {
  const component = snapshot(PromoBannerAuthored, { componentProps: blackSolid });
  hasDataComponent(component, 'promo/promobannerauthored');
});

it('black outline renders correctly', () => {
  const component = snapshot(PromoBannerAuthored, { componentProps: blackOutline });
  hasDataComponent(component, 'promo/promobannerauthored');
});

