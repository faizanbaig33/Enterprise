// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
import 'lib/jest/match-media-mock';
// Local
import XupCardCollection from './XupCardCollection';
import defaultData from './XupCardCollection.mock-data';

it('renders correctly', () => {
  const component = snapshot(XupCardCollection, { componentProps: defaultData });
  hasDataComponent(component, 'listing/xupcardcollection');
});
