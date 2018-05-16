let transform = require('tcomb-json-schema');

import { TextInputTemplate } from '../components/Common/Templates/TextInputTemplate';
export default function parseJsonToTcomb(liformSchemaJson) {
  let liformSchema = JSON.parse(JSON.stringify(liformSchemaJson));
  let schemaOptions = {
    fields: {}
  };

  let properties = liformSchema.properties;
  let fields = schemaOptions.fields;

  let newEnum = {};
  for (let propertyKey in properties) {
    if (properties.hasOwnProperty(propertyKey)) {
      if (properties[propertyKey].hasOwnProperty('enum')) {
        for (let enumKeys in properties[propertyKey].enum) {
          newEnum[properties[propertyKey].enum[enumKeys]] =
            properties[propertyKey].enum_titles[enumKeys];
        }
        properties[propertyKey].enum = newEnum;
        delete properties[propertyKey].enum_titles;
      }
    }
  }

  for (let propertyKey in properties) {
    if (properties.hasOwnProperty(propertyKey)) {
      let options = {};
      options.placeholder = properties[propertyKey].title;
      options.autoCapitalize = 'none';
      if (
        properties[propertyKey].type &&
        properties[propertyKey].type === 'string'
      ) {
        if (!properties[propertyKey].hasOwnProperty('enum')) {
          options.template = TextInputTemplate;
        } else {
          options.label = '';
        }
      }
      if (properties[propertyKey].widget === 'password') {
        options.secureTextEntry = true;
      }
      fields[propertyKey] = options;
    }
  }

  let transformedSchema = transform(liformSchema);
  return { schemaOptions: schemaOptions, transformedSchema: transformedSchema };
}
