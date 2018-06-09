import schemaLiform from '../formSchemas/resetPassword';
import parseJsonToTcomb from '../parserLiformToTcomb';

const {
  transformedSchema: resetPasswordFormSchema,
  schemaOptions
} = parseJsonToTcomb(schemaLiform);

export { schemaOptions, resetPasswordFormSchema };
