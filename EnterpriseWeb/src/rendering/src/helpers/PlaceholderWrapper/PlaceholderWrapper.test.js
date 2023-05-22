// Lib
import { snapshot, renderComponent, eeSitecoreContext } from 'lib/jest/test-utils';
import PlaceholderWrapper from './PlaceholderWrapper';
import { noContent } from './PlaceholderWrapper.mock-data';

it('check component', () => {
  const component = renderComponent(PlaceholderWrapper, { componentProps: noContent });
  expect(component.container.firstChild).toBe(null);
});
