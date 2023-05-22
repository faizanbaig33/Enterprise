// Global
import { snapshot } from 'lib/jest/test-utils';
// Local
import ArticleTags from './ArticleTags';
import defaultData from './ArticleTags.mock-data';

it('renders correctly', () => {
  const component = snapshot(ArticleTags, { componentProps: defaultData });
});
