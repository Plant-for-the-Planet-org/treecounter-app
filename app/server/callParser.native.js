import parseJsonToTcomb from './parserLiformToTcomb';

export default function callParser(liformSchemaJson, config = {}) {
  return parseJsonToTcomb(liformSchemaJson, config);
}
