let transform = require('tcomb-json-schema');
import schemaLiform from './login.js';

const loginFormSchema = transform(schemaLiform);

let schemaOptions = {
  fields: {}
};

let properties = schemaLiform.properties;
let fields = schemaOptions.fields;

for (let propertyKey in properties) {
  if (properties.hasOwnProperty(propertyKey)) {
    let options = {};
    options.placeholder = properties[propertyKey].title;
    options.autoCapitalize = 'none';
    if (properties[propertyKey].widget === 'password') {
      options.secureTextEntry = true;
    }
    fields[propertyKey] = options;
  }
}

console.log(schemaOptions);
export { schemaOptions, loginFormSchema };
