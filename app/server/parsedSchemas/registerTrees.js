import {
  singleTreeForm,
  multipleTreesForm
} from '../formSchemas/registerTrees';
import callParser from '../callParser';
import MeasurementListTemplate from '../../components/RegisterTrees/MeasurementListTemplate';
const config = {
  contributionImages: {
    array: {
      disableRemove: false
    }
  },
  contributionMeasurements: {
    array: {
      template: MeasurementListTemplate
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
