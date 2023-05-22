// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import BlogQuote from './BlogQuote';
import defaultData from './BlogQuote.mock-data';

it('renders correctly', () => {
  const component = snapshot(BlogQuote, { componentProps: defaultData });
  hasDataComponent(component, 'general/blogquote');
});
