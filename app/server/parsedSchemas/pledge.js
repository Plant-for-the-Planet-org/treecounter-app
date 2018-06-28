import schemaLiform from '../formSchemas/pledge';
import parseJsonToTcomb from '../parserLiformToTcomb';

const {
  transformedSchema: pledgeFormSchema,
  schemaOptions: pledgeSchemaOptions
} = parseJsonToTcomb(schemaLiform);

export { pledgeFormSchema, pledgeSchemaOptions };
