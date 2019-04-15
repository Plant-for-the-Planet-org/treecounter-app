import schemaLiform from '../formSchemas/competition';
import callParser from '../callParser';

const {
  transformedSchema: competitionFormSchema,
  schemaOptions: competitionFormSchemaOptions
} = callParser(schemaLiform);
export { competitionFormSchema, competitionFormSchemaOptions };
