import {
  singleTreeForm,
  multipleTreesForm
} from '../formSchemas/registerTrees';
import callParser from '../callParser';

const {
  transformedSchema: singleTreeRegisterFormSchema,
  schemaOptions: schemaOptionsSingleTree
} = callParser(singleTreeForm);

const {
  transformedSchema: multipleTreesRegisterFormSchema,
  schemaOptions: schemaOptionsMultipleTrees
} = callParser(multipleTreesForm);

export {
  singleTreeRegisterFormSchema,
  multipleTreesRegisterFormSchema,
  schemaOptionsSingleTree,
  schemaOptionsMultipleTrees
};
