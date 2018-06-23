import schemaLiform, { plantProject } from '../formSchemas/editProfile';
import parseJsonToTcomb from '../parserLiformToTcomb';
import PlantProjectImageListTemplate from '../../components/EditUserProfile/PlantProjectImageListTemplate.js';
// import FilePickerTemplate from '../../components/EditUserProfile/PlantProjectFilePickerTemplate';

const parsedSchema = {};
Object.keys(schemaLiform).map(userType => {
  parsedSchema[userType] = Object.assign(
    {},
    ...Object.keys(schemaLiform[userType]).map(k => ({
      [k]: parseJsonToTcomb(schemaLiform[userType][k].schema)
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
const plantProjectSchema = parseJsonToTcomb(plantProject.schema, config);

// {
//   plantProjects: {
//     array: { template: PlantProjectListTemplate, disableRemove: false }
//   },
//   image: { file: { template: FilePickerTemplate } }
// }
export { parsedSchema, plantProjectSchema };
