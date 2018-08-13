import {
  singleTreeForm,
  multipleTreesForm
} from '../formSchemas/registerTrees';
import callParser from '../callParser';

const config = {
  contributionImages: {
    array: {
      disableRemove: false
    }
  }
};

const {
  transformedSchema: singleTreeRegisterFormSchema,
  schemaOptions: schemaOptionsSingleTree
} = callParser(singleTreeForm, config);

const {
  transformedSchema: multipleTreesRegisterFormSchema,
  schemaOptions: schemaOptionsMultipleTrees
} = callParser(multipleTreesForm, config);

export {
  singleTreeRegisterFormSchema,
  multipleTreesRegisterFormSchema,
  schemaOptionsSingleTree,
  schemaOptionsMultipleTrees
};
