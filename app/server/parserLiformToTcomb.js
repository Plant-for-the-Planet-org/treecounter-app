import transform from 'tcomb-json-schema';

// Import templates
import { TextInputTemplate } from '../components/Templates/TextInputTemplate';
import { TextAreaTemplate } from '../components/Templates/TextAreaTemplate';
import { CheckboxTemplate } from '../components/Templates/CheckboxTemplate';
import { SelectTemplate } from '../components/Templates/SelectTemplate';
import { MapTemplate } from '../components/Templates/MapTemplate';
import { ListTemplate } from '../components/Templates/ListTemplate';
import { FilePickerTemplate } from '../components/Templates/FilePickerTemplate';

// Import assets
import * as images from '../assets';

export default function parseJsonToTcomb(liformSchemaJson) {
  let liformSchema = JSON.parse(JSON.stringify(liformSchemaJson));

  function getParsedSchema(liformSchema) {
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
    return liformSchema;
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
          (properties[propertyKey].type === 'string' ||
            properties[propertyKey].type === 'integer')
        ) {
          if (properties[propertyKey].hasOwnProperty('icon')) {
            options.config = {
              iconUrl: images[properties[propertyKey].icon]
            };
          }
          if (!properties[propertyKey].hasOwnProperty('enum')) {
            options.placeholder = properties[propertyKey].title;
            options.label = properties[propertyKey].title;
            options.auto = 'none';
            options.autoCapitalize = 'none';
            options.template = TextInputTemplate;
            if (
              properties[propertyKey].type === 'string' &&
              properties[propertyKey].widget !== 'textarea'
            ) {
              options.type = 'text';
            } else if (properties[propertyKey].type === 'integer') {
              options.type = 'number';
            }
          } else {
            options.label = '';
            options.auto = 'none';
            options.template = SelectTemplate;
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
        // Check what kind of widget it has
        switch (properties[propertyKey].widget) {
          case 'password':
            options.secureTextEntry = true;
            options.type = 'password';
            break;
          case 'textarea':
            options.template = TextAreaTemplate;
            break;
          case 'map':
            options.template = MapTemplate;
            break;
          case 'date':
            options.type = properties[propertyKey].widget;
            break;
          case 'file':
            options.template = FilePickerTemplate;
            break;
        }
        // Widgets SwitchCase ENDS
        if (properties[propertyKey].type === 'object') {
          schemaOptions['fields'][propertyKey] = {
            auto: 'none',
            ...getSchemaOptions(properties[propertyKey])
          };
        } else {
          schemaOptions['fields'][propertyKey] = options;
        }

        // Check if form has sub form then call recursively
        /******* fields: {
          contribution: {
            item: {
              fields: {
                diameter: {},
                etc: {}
              }
            }
          }
        } ******/
        if (properties[propertyKey].type === 'array') {
          let arrayOptions = {
            placeholder: properties[propertyKey].title,
            auto: 'none',
            autoCapitalize: 'none',
            disableOrder: true,
            disableRemove: true,
            template: ListTemplate(properties[propertyKey].title)
          };
          schemaOptions['fields'][propertyKey] = {
            ...arrayOptions,
            ...{ item: getSchemaOptions(properties[propertyKey].items) }
          };
          schemaOptions['fields'][propertyKey].item['disableOrder'] = true;
        }
        // ************************************************
        if (liformSchema.required.indexOf(propertyKey)) {
          options['error'] = 'required';
        }
      }
    }
    return schemaOptions;
  }

  let schemaOptions = getSchemaOptions(liformSchema);

  let transformedSchema = transform(getParsedSchema(liformSchema));
  return { schemaOptions: schemaOptions, transformedSchema: transformedSchema };
}
