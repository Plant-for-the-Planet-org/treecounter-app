let transform = require('tcomb-json-schema');

import { TextInputTemplate } from '../components/Templates/TextInputTemplate';
import { CheckboxTemplate } from '../components/Templates/CheckboxTemplate';
import * as images from '../images';

export default function parseJsonToTcomb(liformSchemaJson) {
  let liformSchema = JSON.parse(JSON.stringify(liformSchemaJson));

  let properties = liformSchema.properties;

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

  function getSchemaOptions(liformSchema) {
    let properties = liformSchema.properties;
    let schemaOptions = {
      fields: {}
    };
    for (let propertyKey in properties) {
      if (properties.hasOwnProperty(propertyKey)) {
        let options = {};
        if (
          properties[propertyKey].type &&
          properties[propertyKey].type === 'string'
        ) {
          if (properties[propertyKey].hasOwnProperty('icon')) {
            options.config = {
              iconUrl: images[properties[propertyKey].icon]
            };
          }
          if (!properties[propertyKey].hasOwnProperty('enum')) {
            options.placeholder = properties[propertyKey].title;
            options.auto = 'none';
            options.autoCapitalize = 'none';
            options.template = TextInputTemplate;
          } else {
            options.label = '';
            options.auto = 'none';
            options.nullOption = {
              value: '',
              text: properties[propertyKey].title
            };
          }
        } else if (
          properties[propertyKey].type &&
          properties[propertyKey].type === 'boolean'
        ) {
          options.label = properties[propertyKey].title;
          options.template = CheckboxTemplate;
        }
        if (properties[propertyKey].widget === 'password') {
          options.secureTextEntry = true;
        }
        if (properties[propertyKey].type === 'object') {
          options.auto = 'none';
          schemaOptions['fields'][propertyKey] = getSchemaOptions(
            properties[propertyKey]
          );
        } else {
          schemaOptions['fields'][propertyKey] = options;
        }
        if (liformSchema.required.indexOf(propertyKey)) {
          options['error'] = 'required';
        }
      }
    }
    return schemaOptions;
  }

  let schemaOptions = getSchemaOptions(liformSchema);

  let transformedSchema = transform(liformSchema);
  return { schemaOptions: schemaOptions, transformedSchema: transformedSchema };
}
