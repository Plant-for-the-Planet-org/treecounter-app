import schemaLiform, { plantProject } from '../formSchemas/editProfile';
import parseJsonToTcomb from '../parserLiformToTcomb';
import { ListTemplateGenerator } from '../../components/Templates/ListTemplate';
import React from 'react';
import PrimaryButton from '../../components/Common/Button/PrimaryButton';
import i18n from '../../locales/i18n.js';

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
      <div className="plant-project__item">
        <div className="row-header">Project </div>
        {row.input}
        <PrimaryButton
          onClick={() => {
            this.toggleConfirmProfileDeletion();
          }}
        >
          {i18n.t('label.save_changes')}
        </PrimaryButton>
      </div>
    );
  }
};

const plantProjectSchema = parseJsonToTcomb(plantProject.schema, {
  array: ListTemplateGenerator(listTemplateConfig)
});
console.log('plant project schema', plantProjectSchema, plantProject);

export { parsedSchema, plantProjectSchema };
