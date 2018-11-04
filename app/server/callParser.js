import t from 'tcomb-form';

import parseJsonToTcomb from './parserLiformToTcomb';
import { commonValidator } from './validator';

t.String.getValidationErrorMessage = commonValidator;
t.enums.getValidationErrorMessage = commonValidator;
t.Integer.getValidationErrorMessage = commonValidator;
t.Number.getValidationErrorMessage = commonValidator;
export default function callParser(liformSchemaJson, config = {}) {
  return parseJsonToTcomb(liformSchemaJson, config, commonValidator);
}
