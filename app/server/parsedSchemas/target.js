import schemaLiform from '../formSchemas/target';
import parseJsonToTcomb from '../parserLiformToTcomb';

const { transformedSchema: targetFormSchema, schemaOptions } = parseJsonToTcomb(
  schemaLiform
);

console.log(schemaOptions);
export { schemaOptions, targetFormSchema };
