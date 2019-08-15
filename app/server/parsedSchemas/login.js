import schemaLiform from '../formSchemas/login';
import callParser from '../callParser';

const { transformedSchema: loginFormSchema, schemaOptions } = callParser(
  schemaLiform
);
export { schemaOptions, loginFormSchema };
