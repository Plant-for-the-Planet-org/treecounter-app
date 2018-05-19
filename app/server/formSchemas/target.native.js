import schemaLiform from './target.js';
import parseJsonToTcomb from '../parserLiformToTcomb';

const { transformedSchema: targetFormSchema, schemaOptions } = parseJsonToTcomb(
  schemaLiform
);
export { schemaOptions, targetFormSchema };
