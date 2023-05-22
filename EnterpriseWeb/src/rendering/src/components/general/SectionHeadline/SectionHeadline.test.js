// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import SectionHeadline from './SectionHeadline';
import defaultData from './SectionHeadline.mock-data';

it('renders correctly', () => {
  const component = snapshot(SectionHeadline, { componentProps: defaultData });
  hasDataComponent(component, 'general/sectionheadline');
});
