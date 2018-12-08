import schemaLiform from '../formSchemas/currencySelector';
import callParser from '../callParser';

export function getFormSchema(currencies) {
  schemaLiform.properties.currency.enum = Object.keys(currencies);
  schemaLiform.properties.currency.enum_titles = Object.values(currencies);
  return callParser(schemaLiform);
}

// export { schemaOptions, currencySelectorFormSchema };
