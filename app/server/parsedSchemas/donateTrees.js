import schemaLiform from '../formSchemas/donateTrees';
import parseJsonToTcomb from '../parserLiformToTcomb';

const {
  transformedSchema: receiptIndividualFormSchema,
  schemaOptions: individualSchemaOptions
} = parseJsonToTcomb(schemaLiform.properties.receiptIndividual);

const {
  transformedSchema: receiptCompanyFormSchema,
  schemaOptions: companySchemaOptions
} = parseJsonToTcomb(schemaLiform.properties.receiptCompany);

export {
  individualSchemaOptions,
  receiptIndividualFormSchema,
  receiptCompanyFormSchema,
  companySchemaOptions
};
