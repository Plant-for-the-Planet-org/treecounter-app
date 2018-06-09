import t from 'tcomb-form';
import React from 'react';
import i18n from '../../locales/i18n';

// Create CUSTOM list with custom add and remove buttons
export function ListTemplate(title) {
  const template = t.form.Form.templates.list.clone({
    renderAddButton: locals => {
      return (
        <div className="pftp-addbutton">
          <button onClick={locals.add.click}>+&nbsp;{i18n.t(title)}</button>
        </div>
      );
    }
  });
  return template;
}
