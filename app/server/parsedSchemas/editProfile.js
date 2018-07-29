import schemaLiform, { plantProject } from '../formSchemas/editProfile';
import PlantProjectImageListTemplate from '../../components/EditUserProfile/PlantProjectImageListTemplate.js';

import callParser from '../callParser';
// import FilePickerTemplate from '../../components/EditUserProfile/PlantProjectFilePickerTemplate';

const parsedSchema = {};
Object.keys(schemaLiform).map(userType => {
  parsedSchema[userType] = Object.assign(
    {},
    ...Object.keys(schemaLiform[userType]).map(k => ({
      [k]: callParser(schemaLiform[userType][k].schema)
    }))
  );
});

const config = {
  plantProjectImages: {
    array: {
      template: PlantProjectImageListTemplate,
      disableRemove: false
    }
  }
};
const plantProjectSchema = callParser(plantProject.schema, config);

// {
//   plantProjects: {
//     array: { template: PlantProjectListTemplate, disableRemove: false }
//   },
//   image: { file: { template: FilePickerTemplate } }
// }
export { parsedSchema, plantProjectSchema };
