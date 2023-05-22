// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import Form from './Form';
import defaultData from './Form.mock-data';

it('renders correctly', () => {
  const component = snapshot(Form, { componentProps: defaultData });
});
