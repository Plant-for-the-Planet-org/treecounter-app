import schemaLiform from '../formSchemas/editProfile';
import parseJsonToTcomb from '../parserLiformToTcomb';

const parsedSchema = {};
Object.keys(schemaLiform).map(userType => {
  parsedSchema[userType] = Object.assign(
    {},
    ...Object.keys(schemaLiform[userType]).map(k => ({
      [k]: parseJsonToTcomb(schemaLiform[userType][k].schema)
    }))
  );
});
console.log(parsedSchema);

export { parsedSchema };
