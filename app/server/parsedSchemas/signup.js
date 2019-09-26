import schemaLiform from '../formSchemas/signup';
import callParser from '../callParser';

const {
  transformedSchema: signupSchemaTpo,
  schemaOptions: schemaOptionsTpo
} = callParser(schemaLiform.tpo);

const {
  transformedSchema: signupSchemaCompany,
  schemaOptions: schemaOptionsCompany
} = callParser(schemaLiform.company);

const {
  transformedSchema: signupSchemaEducation,
  schemaOptions: schemaOptionsEducation
} = callParser(schemaLiform.education);

const {
  transformedSchema: signupSchemaGovernment,
  schemaOptions: schemaOptionsGovernment
} = callParser(schemaLiform.government);

const {
  transformedSchema: signupSchemaIndividual,
  schemaOptions: schemaOptionsIndividual
} = callParser(schemaLiform.individual);

const {
  transformedSchema: signupSchemaOrganization,
  schemaOptions: schemaOptionsOrganization
} = callParser(schemaLiform.organization);

const {
  transformedSchema: signupSchemaVodafone,
  schemaOptions: schemaOptionsVodafone
} = callParser(schemaLiform.vodafone);

const signupFormSchema = {
  tpo: signupSchemaTpo,
  company: signupSchemaCompany,
  organization: signupSchemaOrganization,
  individual: signupSchemaIndividual,
  government: signupSchemaGovernment,
  education: signupSchemaEducation,
  vodafone: signupSchemaVodafone
};

const schemaOptions = {
  tpo: schemaOptionsTpo,
  company: schemaOptionsCompany,
  organization: schemaOptionsOrganization,
  individual: schemaOptionsIndividual,
  government: schemaOptionsGovernment,
  education: schemaOptionsEducation,
  vodafone: schemaOptionsVodafone
};

export { schemaOptions, signupFormSchema };
