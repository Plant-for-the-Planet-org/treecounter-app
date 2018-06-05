import schemaLiform from '../formSchemas/donateTrees';
import parseJsonToTcomb from '../parserLiformToTcomb';

const {
  transformedSchema: recieptIndividualFormSchema,
  schemaOptions: individualSchemaOptions
} = parseJsonToTcomb(schemaLiform.properties.receiptIndividual);

const {
  transformedSchema: recieptCompanyFormSchema,
  schemaOptions: companySchemaOptions
} = parseJsonToTcomb(schemaLiform.properties.receiptCompany);

export {
  individualSchemaOptions,
  recieptIndividualFormSchema,
  recieptCompanyFormSchema,
  companySchemaOptions
};
