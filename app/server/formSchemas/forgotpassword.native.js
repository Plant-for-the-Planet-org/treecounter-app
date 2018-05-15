import schemaLiform from './forgotpassword.js';
import parseJsonToTcomb from '../parserLiformToTcomb';

const {
  transformedSchema: forgotPasswordFormSchema,
  schemaOptions
} = parseJsonToTcomb(schemaLiform);
export { schemaOptions, forgotPasswordFormSchema };
