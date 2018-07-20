import schemaLiform from '../formSchemas/resetPassword';
import callParser from '../callParser';

const {
  transformedSchema: resetPasswordFormSchema,
  schemaOptions
} = callParser(schemaLiform);

export { schemaOptions, resetPasswordFormSchema };
