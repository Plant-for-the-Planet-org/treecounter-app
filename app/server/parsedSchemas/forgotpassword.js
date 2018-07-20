import schemaLiform from '../formSchemas/forgotpassword';
import callParser from '../callParser';

const {
  transformedSchema: forgotPasswordFormSchema,
  schemaOptions
} = callParser(schemaLiform);

export { schemaOptions, forgotPasswordFormSchema };
