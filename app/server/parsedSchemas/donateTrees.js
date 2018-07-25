import schemaLiform from '../formSchemas/donateTrees';
import callParser from '../callParser';

const {
  transformedSchema: receiptIndividualFormSchema,
  schemaOptions: individualSchemaOptions
} = callParser(schemaLiform.properties.receiptIndividual);

const {
  transformedSchema: receiptCompanyFormSchema,
  schemaOptions: companySchemaOptions
} = callParser(schemaLiform.properties.receiptCompany);

export {
  individualSchemaOptions,
  receiptIndividualFormSchema,
  receiptCompanyFormSchema,
  companySchemaOptions
};
