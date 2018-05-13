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

let properties = liformSchema.properties;

let requiredArray = liformSchema.required.map(value => {
  console.log(properties[value].title);
  return properties[value].title;
});

liformSchema.required = requiredArray;
let keyArray = Object.keys(properties);

for (let propertyKey in keyArray) {
  properties[properties[keyArray[propertyKey]].title] =
    properties[keyArray[propertyKey]];
  delete properties[keyArray[propertyKey]];
}

console.log(liformSchema);
let transformedSchema = transform(liformSchema);
console.log(transformedSchema);
export default transformedSchema;
