import schemaLiform from '../formSchemas/giftTrees';
import parseJsonToTcomb from '../parserLiformToTcomb';

const {
  transformedSchema: giftInvitationFormSchema,
  schemaOptions: giftInvitationSchemaOptions
} = parseJsonToTcomb(schemaLiform.properties.giftInvitation);

export { giftInvitationFormSchema, giftInvitationSchemaOptions };
