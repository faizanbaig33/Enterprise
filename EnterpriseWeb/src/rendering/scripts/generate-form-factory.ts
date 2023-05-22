import fs from 'fs';
import path from 'path';
import generateFieldFactory, { ComponentFile, PackageDefinition } from './templates/form-factory';
import { getItems, watchItems } from './utils';

/*
  FIELD FACTORY GENERATION

  This script supports two modes. In default mode, the component factory file is written once.
  In watch mode, the component factory source folder is watched, and fieldFactory.ts is
  regenerated whenever files are added or deleted. Run in watch mode by passing a `--watch` argument
  when calling the script.
*/

const fieldFactoryPath = path.resolve('src/temp/formFactory.tsx');
const fieldRootPath = 'src/helpers/Forms/Fields';
const fieldValidatorsRootPath = 'src/lib/forms/Validators';

// Matches TypeScript files that are not type definition files (name.d.ts) or storybook stories (name.stories.tsx)
const fileFormat = new RegExp(
  /(.+)(?<!\.d)(?<!\.mock-data)(?<!\.Theme)(?<!\.stories)(?<!\.test)(?<!\.graphql)\.tsx?$/
);

const isWatch = process.argv.some((arg) => arg === '--watch');

(isWatch ? watchFieldFactory : writeFieldFactory)();

/**
 * Watches component directory for changes. When files are added or deleted, the component factory
 * file (componentFactory.ts) is regenerated. This is used during `jss start` to pick up new or
 * removed components at runtime.
 */
function watchFieldFactory() {
  console.log(`Watching for changes to field factory sources in ${fieldRootPath}...`);

  watchItems(fieldRootPath, writeFieldFactory);
  watchItems(fieldValidatorsRootPath, writeFieldFactory);
}

/**
 * Generates the field factory file and saves it to the filesystem.
 */
function writeFieldFactory() {
  const packages: PackageDefinition[] = [];
  const components = getFieldList(fieldRootPath);
  const validators = getFieldList(fieldValidatorsRootPath);

  components.unshift(...packages);

  const fileContent = generateFieldFactory(components, validators);
  console.log(`Writing component factory to ${fieldFactoryPath}`);
  fs.writeFileSync(fieldFactoryPath, fileContent, {
    encoding: 'utf8',
  });
}

function getFieldList(path: string): (PackageDefinition | ComponentFile)[] {
  const components = getItems<PackageDefinition | ComponentFile>({
    path,
    resolveItem: (path, name) => ({
      path: `${path}/${name}`,
      componentName: name,
      moduleName: name.replace(/[^\w]+/g, ''),
    }),
    cb: (name) => console.debug(`Registering JSS component ${name}`),
    fileFormat: fileFormat,
  });

  return components;
}
