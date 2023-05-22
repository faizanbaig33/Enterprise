// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import TestForm from './TestForm';
import defaultData from './TestForm.mock-data';

it('renders correctly', () => {
  const component = snapshot(TestForm, { componentProps: defaultData });
  hasDataComponent(component, 'forms/testform');
});
