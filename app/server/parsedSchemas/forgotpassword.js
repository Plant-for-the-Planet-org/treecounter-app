import schemaLiform from '../formSchemas/forgotpassword';
import parseJsonToTcomb from '../parserLiformToTcomb';

const {
  transformedSchema: forgotPasswordFormSchema,
  schemaOptions
} = parseJsonToTcomb(schemaLiform);

export { schemaOptions, forgotPasswordFormSchema };
