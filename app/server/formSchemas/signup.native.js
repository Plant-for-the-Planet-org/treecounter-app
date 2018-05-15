import schemaLiform from './signup.js';
import parseJsonToTcomb from '../parserLiformToTcomb';

const {
  transformedSchema: signupSchemaTpo,
  schemaOptions: schemaOptionsTpo
} = parseJsonToTcomb(schemaLiform.tpo);

const {
  transformedSchema: signupSchemaCompany,
  schemaOptions: schemaOptionsCompany
} = parseJsonToTcomb(schemaLiform.company);

const {
  transformedSchema: signupSchemaEducation,
  schemaOptions: schemaOptionsEducation
} = parseJsonToTcomb(schemaLiform.education);

const {
  transformedSchema: signupSchemaGovernment,
  schemaOptions: schemaOptionsGovernment
} = parseJsonToTcomb(schemaLiform.government);

const {
  transformedSchema: signupSchemaIndividual,
  schemaOptions: schemaOptionsIndividual
} = parseJsonToTcomb(schemaLiform.individual);

const {
  transformedSchema: signupSchemaOrganization,
  schemaOptions: schemaOptionsOrganization
} = parseJsonToTcomb(schemaLiform.organization);

const signupFormSchema = {
  tpo: signupSchemaTpo,
  company: signupSchemaCompany,
  organization: signupSchemaOrganization,
  individual: signupSchemaIndividual,
  government: signupSchemaGovernment,
  education: signupSchemaEducation
};

const schemaOptions = {
  tpo: schemaOptionsTpo,
  company: schemaOptionsCompany,
  organization: schemaOptionsOrganization,
  individual: schemaOptionsIndividual,
  government: schemaOptionsGovernment,
  education: schemaOptionsEducation
};
export { schemaOptions, signupFormSchema };
