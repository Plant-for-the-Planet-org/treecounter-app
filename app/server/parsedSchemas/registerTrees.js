import { treeForm } from '../formSchemas/registerTrees';
import callParser from '../callParser';
//import MeasurementListTemplate from '../../components/RegisterTrees/MeasurementListTemplate';
const config = {
  contributionImages: {
    array: {
      disableRemove: false
    }
  }
  // contributionMeasurements: {
  //   array: {
  //     template: MeasurementListTemplate,
  //     disableRemove: false
  //   }
  // }
};

const {
  transformedSchema: singleTreeRegisterFormSchema,
  schemaOptions: schemaOptionsSingleTree
} = callParser(singleTreeForm['single-tree'], config);

const {
  transformedSchema: multipleTreesRegisterFormSchema,
  schemaOptions: schemaOptionsMultipleTrees
} = callParser(multipleTreesForm['multiple-trees'], config);

export {
  singleTreeRegisterFormSchema,
  multipleTreesRegisterFormSchema,
  schemaOptionsSingleTree,
  schemaOptionsMultipleTrees
};
