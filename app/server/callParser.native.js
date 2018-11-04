import parseJsonToTcomb from './parserLiformToTcomb';
import { commonValidator } from './validator';

export default function callParser(liformSchemaJson, config = {}) {
  return parseJsonToTcomb(liformSchemaJson, config, commonValidator);
}
