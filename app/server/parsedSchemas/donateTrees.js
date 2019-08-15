import schemaLiform from '../formSchemas/donateTrees';
import callParser from '../callParser';

const config = {
  address: {
    style: { marginLeft: 20 }
  },
  zipCode: {
    style: { marginLeft: 20 }
  },
  city: {
    style: { marginLeft: 20 }
  },
  companyname: {
    style: { marginLeft: 20 }
  },
  country: {
    style: { marginLeft: 20 }
  }
};

const {
  transformedSchema: receiptIndividualFormSchema,
  schemaOptions: individualSchemaOptions
} = callParser(schemaLiform.properties.receiptIndividual, config);

const {
  transformedSchema: receiptCompanyFormSchema,
  schemaOptions: companySchemaOptions
} = callParser(schemaLiform.properties.receiptCompany, config);

export {
  individualSchemaOptions,
  receiptIndividualFormSchema,
  receiptCompanyFormSchema,
  companySchemaOptions
};
