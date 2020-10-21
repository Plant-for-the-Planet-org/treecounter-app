import transform from 'tcomb-json-schema';

// Import templates
import { TextInputTemplate } from '../components/Templates/TextInputTemplate';
import { TextAreaTemplate } from '../components/Templates/TextAreaTemplate';
import { CheckboxTemplate } from '../components/Templates/CheckboxTemplate';
import { getSelectTemplate } from '../components/Templates/SelectTemplate';
import { MapTemplate } from '../components/Templates/MapTemplate';
import { ListTemplateGenerator } from '../components/Templates/ListTemplate';
import { FilePickerTemplate } from '../components/Templates/FilePickerTemplate';
import { FloatInputTemplate } from '../components/Templates/FloatInputTemplate';
import { DatePickerTemplate } from '../components/Templates/DatePickerTemplate';

// Import assets
import * as images from '../assets';
import { formatDate } from '../utils/utils';

function isEmail(x) {
  return /(.)+@(.)+/.test(x);
}

transform.resetFormats();
transform.registerFormat('email', isEmail);

export default function parseJsonToTcomb(liformSchemaJson, config, validator) {
  let liformSchema = JSON.parse(JSON.stringify(liformSchemaJson));

  function getParsedSchema(liformSchema) {
    let properties = liformSchema.properties;

    for (let propertyKey in properties) {
      if (properties[propertyKey]) {
        if (properties[propertyKey]['enum']) {
          let newEnum = {};
          for (let enumKeys in properties[propertyKey].enum) {
            newEnum[properties[propertyKey].enum[enumKeys]] = properties[propertyKey].enum_titles[enumKeys];
          }
          properties[propertyKey].enum = newEnum;
          delete properties[propertyKey].enum_titles;
        }
      }
    }
    return liformSchema;
  }

  function getSchemaOptions(liformSchema, innerConfig = {}) {
    let properties = liformSchema.properties;
    let schemaOptions = {
      fields: {}
    };
    for (let propertyKey in properties) {
      if (properties[propertyKey]) {
        let options = {};
        if (
          properties[propertyKey].type &&
          (properties[propertyKey].type === 'string' ||
            properties[propertyKey].type === 'integer' ||
            properties[propertyKey].type === 'number')
        ) {
          if (properties[propertyKey]['icon']) {
            options.config = {
              iconUrl: images[properties[propertyKey].icon]
            };
            // already done below for propertyKey === 'email'
            //if (properties[propertyKey].icon === 'email') {
            //  options.config = { ...options.config, email: true };
            //  properties[propertyKey].format = 'email';
            //}
          }
          if (properties[propertyKey]['maxDate']) {
            options.config = { ...options.config, maxDate: true };
          }
          if (properties[propertyKey]['minDate']) {
            options.config = { ...options.config, minDate: true };
          }
          if (innerConfig[propertyKey] && innerConfig[propertyKey]['style']) {
            options.config = {
              style: innerConfig[propertyKey].style
            };
          }
          if (propertyKey === 'email') {
            options.config = { ...options.config, email: true };
            properties[propertyKey].format = 'email';
          }

          if (!properties[propertyKey]['enum']) {
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
              options.keyboardType = 'numeric';
            } else if (properties[propertyKey].type === 'number') {
              options.type = 'number';
              options.template = FloatInputTemplate;
            }
          } else {
            options.label = '';
            options.auto = 'none';
            options.template = getSelectTemplate();
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
            options.template = DatePickerTemplate;
            options.type = properties[propertyKey].widget;
            options.config = {
              ...options.config,
              format: date => formatDate(date),
              dateFormat: date => formatDate(date)
            };
            break;
          case 'hidden':
            options.type = properties[propertyKey].widget;
            options.hidden = true;
            break;
          case 'file':
            options.template =
              (innerConfig[propertyKey] &&
                innerConfig[propertyKey].file &&
                innerConfig[propertyKey].file.template) ||
              FilePickerTemplate;
            options.config = {
              ...options.config,
              category: properties[propertyKey]['category'],
              variant: properties[propertyKey]['variant']
            };
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
          let title = properties[propertyKey].title;
          let arrayConfig =
            innerConfig[propertyKey] &&
            innerConfig[propertyKey][properties[propertyKey].type];
          let arrayTemplate = ListTemplateGenerator({})(title);
          let disableRemove = true;
          if (arrayConfig) {
            arrayTemplate = arrayConfig.template
              ? arrayConfig.template(title)
              : arrayTemplate;
            disableRemove =
              arrayConfig.disableRemove !== 'undefined'
                ? arrayConfig.disableRemove
                : disableRemove;
          }

          let arrayOptions = {
            placeholder: title,
            auto: 'none',
            autoCapitalize: 'none',
            disableOrder: true,
            disableRemove: disableRemove,
            template: arrayTemplate
          };
          schemaOptions['fields'][propertyKey] = {
            ...arrayOptions,
            ...{
              item: getSchemaOptions(properties[propertyKey].items, innerConfig)
            }
          };
          schemaOptions['fields'][propertyKey].item['disableOrder'] = true;
        }
        // ************************************************
        if (
          liformSchema.required &&
          liformSchema.required.indexOf(propertyKey) != -1
        ) {
          options.config = { ...options.config, required: true };
        }
        if (liformSchema.properties[propertyKey].attr) {
          options.config = {
            ...options.config,
            attr: liformSchema.properties[propertyKey].attr
          };
        }
        if (validator) {
          options.error = validator;
        }
      }
    }
    return schemaOptions;
  }

  let schemaOptions = getSchemaOptions(liformSchema, config);

  let transformedSchema = transform(getParsedSchema(liformSchema));
  return { schemaOptions: schemaOptions, transformedSchema: transformedSchema };
}
