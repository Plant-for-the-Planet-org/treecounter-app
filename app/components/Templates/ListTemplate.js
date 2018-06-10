import t from 'tcomb-form';
import React from 'react';
export const renderAddButtonConfig = {};

export function ListTemplateGenerator(config) {
  return function ListTemplate(title) {
    console.log('ListTemplate');
    const template = t.form.Form.templates.list.clone({
      renderAddButton: locals => {
        return (
          <div className="pftp-addbutton">
            <button onClick={locals.add.click}>+&nbsp;{title}</button>
          </div>
        );
      },
      ...config
    });
    return template;
  };
}
