let transform = require('tcomb-json-schema');

let TcombType = transform({
  type: 'string',
  enum: ['Street', 'Avenue', 'Boulevard']
});

console.log(TcombType);

let liformSchema = {
  title: 'login',
  type: 'object',
  properties: {
    _username: {
      type: 'string',
      title: 'Username',
      propertyOrder: 1
    },
    _password: {
      type: 'string',
      title: 'Password',
      widget: 'password',
      propertyOrder: 2
    }
  },
  required: ['_username', '_password'],
  submit_url: '/api/login_check',
  submit_method: 'POST'
};

let schemaOptions = {
  fields: {}
};

let properties = liformSchema.properties;
let fields = schemaOptions.fields;
// let requiredArray = liformSchema.required.map(value => {
//   console.log(properties[value].title);
//   return properties[value].title;
// });

// liformSchema.required = requiredArray;

for (let propertyKey in properties) {
  if (properties.hasOwnProperty(propertyKey)) {
    let options = {};
    options.placeholder = properties[propertyKey].title;
    options.autoCapitalize = 'none';
    if (properties[propertyKey].widget === 'password') {
      options.secureTextEntry = true;
    }
    fields.propertyKey = options;
  }
}

console.log(liformSchema);
let transformedSchema = transform(liformSchema);
console.log(transformedSchema);
export default transformedSchema;
