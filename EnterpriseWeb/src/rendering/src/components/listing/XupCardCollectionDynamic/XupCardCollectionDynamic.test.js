// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
import 'lib/jest/match-media-mock';
// Local
import XupCardCollectionDynamic from './XupCardCollectionDynamic';
import defaultData from './XupCardCollectionDynamic.mock-data';

it('renders correctly', () => {
  const component = snapshot(XupCardCollectionDynamic, { componentProps: defaultData });
  hasDataComponent(component, 'listing/xupcardcollectiondynamic');
});
