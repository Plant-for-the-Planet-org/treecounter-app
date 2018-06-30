import schemaLiform from '../formSchemas/target';
import parseJsonToTcomb from '../parserLiformToTcomb';

const { transformedSchema: targetFormSchema, schemaOptions } = parseJsonToTcomb(
  schemaLiform
);

export { schemaOptions, targetFormSchema };
