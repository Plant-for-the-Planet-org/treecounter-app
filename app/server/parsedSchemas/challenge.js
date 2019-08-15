import schemaLiform from '../formSchemas/challenge';
import callParser from '../callParser';

const {
  transformedSchema: challengeFormSchema,
  schemaOptions: challengeFormSchemaOptions
} = callParser(schemaLiform.properties.invitee);

export { challengeFormSchema, challengeFormSchemaOptions };
