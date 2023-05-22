// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import BlogContainer from './BlogContainer';
import defaultData from './BlogContainer.mock-data';

it('renders correctly', () => {
  const component = snapshot(BlogContainer, { componentProps: defaultData });
  hasDataComponent(component, 'tabs/blogcontainer');
});
