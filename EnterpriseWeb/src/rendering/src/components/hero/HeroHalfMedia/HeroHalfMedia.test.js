// Globalimport { hasDataComponent, snapshot } from 'lib/jest/test-utils';// Localimport HeroHalfMedia from './HeroHalfMedia';import defaultData from './HeroHalfMedia.mock-data';import darkData from './HeroHalfMedia.mock-data-dark';import grayData from './HeroHalfMedia.mock-data-gray';import leftAlignData from './HeroHalfMedia.mock-data-left-align';import videoData from './HeroHalfMedia.mock-data-video';it('renders correctly', () => {  const component = snapshot(HeroHalfMedia, { componentProps: defaultData });  hasDataComponent(component, 'hero/herohalfmedia');});it('dark renders correctly', () => {  const component = snapshot(HeroHalfMedia, { componentProps: darkData });  hasDataComponent(component, 'hero/herohalfmedia');});it('left align renders correctly', () => {  const component = snapshot(HeroHalfMedia, { componentProps: leftAlignData });  hasDataComponent(component, 'hero/herohalfmedia');});it('gray renders correctly', () => {  const component = snapshot(HeroHalfMedia, { componentProps: grayData });  hasDataComponent(component, 'hero/herohalfmedia');});it('video renders correctly', () => {  const component = snapshot(HeroHalfMedia, { componentProps: videoData });  hasDataComponent(component, 'hero/herohalfmedia');});