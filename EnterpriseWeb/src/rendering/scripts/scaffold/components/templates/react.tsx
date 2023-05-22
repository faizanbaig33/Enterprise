import { Template } from '../utils';

export const reactTemplate: Template<any> = ({ componentName }) => {
  return `export type ${componentName}Props = {
}
const ${componentName} = ({}: ${componentName}Props) => {
  return (
    <div>${componentName}</div>
  );
}
export default ${componentName}`;
};
