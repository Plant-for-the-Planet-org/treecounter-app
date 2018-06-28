import {
  singleTreeForm,
  multipleTreesForm
} from '../formSchemas/registerTrees';
import parseJsonToTcomb from '../parserLiformToTcomb';

const {
  transformedSchema: singleTreeRegisterFormSchema,
  schemaOptions: schemaOptionsSingleTree
} = parseJsonToTcomb(singleTreeForm);

const {
  transformedSchema: multipleTreesRegisterFormSchema,
  schemaOptions: schemaOptionsMultipleTrees
} = parseJsonToTcomb(multipleTreesForm);

export {
  singleTreeRegisterFormSchema,
  multipleTreesRegisterFormSchema,
  schemaOptionsSingleTree,
  schemaOptionsMultipleTrees
};
