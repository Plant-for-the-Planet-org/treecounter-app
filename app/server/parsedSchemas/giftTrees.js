import schemaLiform from '../formSchemas/giftTrees';
import callParser from '../callParser';

const {
  transformedSchema: giftInvitationFormSchema,
  schemaOptions: giftInvitationSchemaOptions
} = callParser(schemaLiform.properties.giftInvitation);

export { giftInvitationFormSchema, giftInvitationSchemaOptions };
