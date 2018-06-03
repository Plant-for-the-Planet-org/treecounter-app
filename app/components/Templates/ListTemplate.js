import t from 'tcomb-form';
import React from 'react';

// Create CUSTOM list with custom add and remove buttons
export function ListTemplate(title) {
  const template = t.form.Form.templates.list.clone({
    renderAddButton: locals => {
      return (
        <div className="pftp-addbutton">
          <button onClick={locals.add.click}>+&nbsp;{title}</button>
        </div>
      );
    }
  });
  return template;
}
