// Global
import { hasDataComponent, renderComponent } from 'lib/jest/test-utils';
// Local
import Component from './Component';
import defaultData from './Component.mock-data';

it('renders data component', () => {
  const component = renderComponent(Component, { componentProps: defaultData[0] });
  hasDataComponent(component, defaultData[0].dataComponent);
});

it('renders passed id', () => {
  const component = renderComponent(Component, { componentProps: defaultData[0] });
  const nodes = component.baseElement.querySelectorAll(`[id="${defaultData[0].fields.sectionId.value}"]`);
  expect(nodes.length).toBe(1);
});

it('renders computed id', () => {
  const component = renderComponent(Component, { componentProps: defaultData[1] });
  const nodes = component.baseElement.querySelectorAll(`[id="id1695242607"]`);
  expect(nodes.length).toBe(1);
});

