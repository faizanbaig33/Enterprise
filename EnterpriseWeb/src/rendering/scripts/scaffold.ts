/* eslint-disable @typescript-eslint/no-var-requires */
import { scaffoldComponent } from './scaffold/components';
const { program } = require('commander');

program
  .command('component')
  .description('Create template files for components')
  .argument('[component-name]')
  .action((componentName: string) => {
    scaffoldComponent(componentName);
  });

program.parse(process.argv);
