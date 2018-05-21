import schemaLiform from '../formSchemas/login';
import parseJsonToTcomb from '../parserLiformToTcomb';

const { transformedSchema: loginFormSchema, schemaOptions } = parseJsonToTcomb(
  schemaLiform
);
export { schemaOptions, loginFormSchema };
