import schemaLiform, { plantProject } from '../formSchemas/editProfile';
import parseJsonToTcomb from '../parserLiformToTcomb';
import PlantProjectListTemplate from '../../components/EditUserProfile/PlantProjectListTemplate';

const parsedSchema = {};
Object.keys(schemaLiform).map(userType => {
  parsedSchema[userType] = Object.assign(
    {},
    ...Object.keys(schemaLiform[userType]).map(k => ({
      [k]: parseJsonToTcomb(schemaLiform[userType][k].schema)
    }))
  );
});

const plantProjectSchema = parseJsonToTcomb(plantProject.schema, {
  array: PlantProjectListTemplate
});

export { parsedSchema, plantProjectSchema };
