// polyfill for Object.values
const objectToValuesPolyfill = (object) => {
  return Object.keys(object).map(key => object[key]);
};
Object.values = Object.values || objectToValuesPolyfill;
