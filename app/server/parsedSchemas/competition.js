import schemaLiform from '../formSchemas/competition';
import callParser from '../callParser';

const { transformedSchema: competitionFormSchema, schemaOptions } = callParser(
  schemaLiform
);
export { schemaOptions, competitionFormSchema };
