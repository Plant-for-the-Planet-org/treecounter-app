import schemaLiform from '../formSchemas/pledge';
import callParser from '../callParser';

const {
  transformedSchema: pledgeFormSchema,
  schemaOptions: pledgeSchemaOptions
} = callParser(schemaLiform);

export { pledgeFormSchema, pledgeSchemaOptions };
