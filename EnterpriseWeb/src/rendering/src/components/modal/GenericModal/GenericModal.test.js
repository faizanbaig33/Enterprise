// Global
import { hasDataComponent, snapshot } from 'lib/jest/test-utils';
// Local
import GenericModal from './GenericModal';
import defaultData from './GenericModal.mock-data';

it('renders correctly', () => {
  const component = snapshot(GenericModal, { componentProps: defaultData });
  hasDataComponent(component, 'modal/genericmodal');
});
