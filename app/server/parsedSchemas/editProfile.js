import schemaLiform, { plantProject } from '../formSchemas/editProfile';
import parseJsonToTcomb from '../parserLiformToTcomb';
import { ListTemplateGenerator } from '../../components/Templates/ListTemplate';
import React from 'react';

const parsedSchema = {};
Object.keys(schemaLiform).map(userType => {
  parsedSchema[userType] = Object.assign(
    {},
    ...Object.keys(schemaLiform[userType]).map(k => ({
      [k]: parseJsonToTcomb(schemaLiform[userType][k].schema)
    }))
  );
});
console.log(parsedSchema);

const listTemplateConfig = {
  renderRowWithoutButtons: (row, locals) => {
    console.log('renderRow', row, locals);
    return (
      <div className="row1">
        {row.input}
        <button onClick={locals.add.click}>+&nbsp;{'title'}</button>
      </div>
    );
  }
};

const plantProjectSchema = parseJsonToTcomb(plantProject.schema, {
  array: ListTemplateGenerator(listTemplateConfig)
});
console.log('plant project schema', plantProjectSchema, plantProject);

export { parsedSchema, plantProjectSchema };
