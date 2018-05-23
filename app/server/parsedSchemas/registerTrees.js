import {
  singleTreeForm,
  multipleTreesForm
} from '../formSchemas/registerTrees';
import parseJsonToTcomb from '../parserLiformToTcomb';

const {
  transformedSchema: singleTreeRegisterFormSchema,
  schemaOptionsSingleTree
} = parseJsonToTcomb(singleTreeForm);

const {
  transformedSchema: multipleTreesRegisterFormSchema,
  schemaOptionsMultipleTrees
} = parseJsonToTcomb(multipleTreesForm);

export {
  singleTreeRegisterFormSchema,
  multipleTreesRegisterFormSchema,
  schemaOptionsSingleTree,
  schemaOptionsMultipleTrees
};
