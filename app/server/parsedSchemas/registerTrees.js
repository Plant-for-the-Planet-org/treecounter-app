import schemaLiform from '../formSchemas/registerTrees';
import parseJsonToTcomb from '../parserLiformToTcomb';

const {
  transformedSchema: registerTreesFormSchema,
  schemaOptions
} = parseJsonToTcomb(schemaLiform);

export { schemaOptions, registerTreesFormSchema };
