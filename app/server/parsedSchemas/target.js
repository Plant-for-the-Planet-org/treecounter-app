import schemaLiform from '../formSchemas/target';
import callParser from '../callParser';

const { transformedSchema: targetFormSchema, schemaOptions } = callParser(
  schemaLiform
);

export { schemaOptions, targetFormSchema };
