import treeForm from '../formSchemas/registerTrees';
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
} = callParser(treeForm['single_tree'], config);
const {
  transformedSchema: multipleTreesRegisterFormSchema,
  schemaOptions: schemaOptionsMultipleTrees
} = callParser(treeForm['multiple_trees'], config);

export {
  singleTreeRegisterFormSchema,
  multipleTreesRegisterFormSchema,
  schemaOptionsSingleTree,
  schemaOptionsMultipleTrees
};
