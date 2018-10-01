import schemaLiform from '../formSchemas/redemption';
import callParser from '../callParser';

const { transformedSchema: redemptionFormSchema, schemaOptions } = callParser(
  schemaLiform
);

export { schemaOptions, redemptionFormSchema };
