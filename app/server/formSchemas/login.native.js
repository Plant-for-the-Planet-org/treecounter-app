import schemaLiform from './login.js';
import parseJsonToTcomb from './parserLiformToTcomb';

const { transformedSchema: loginFormSchema, schemaOptions } = parseJsonToTcomb(
  schemaLiform
);
export { schemaOptions, loginFormSchema };
