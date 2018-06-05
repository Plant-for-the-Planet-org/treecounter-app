import schemaLiform from '../formSchemas/editProfile';
import parseJsonToTcomb from '../parserLiformToTcomb';

const parsedSchema = {};
Object.keys(schemaLiform).map(userType => {
  parsedSchema[userType] = Object.assign(
    {},
    ...Object.keys(schemaLiform.tpo).map(k => ({
      [k]: parseJsonToTcomb(schemaLiform.tpo[k].schema)
    }))
  );
});
console.log(parsedSchema);

export { parsedSchema };
