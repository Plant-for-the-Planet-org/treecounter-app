import React from 'react';

export function TextInputTemplate(locals) {
  return (
    <div className="pftp-textfield">
      {locals.config.iconUrl ? (
        <img className="pftp-textfield__icon" src={locals.config.iconUrl} />
      ) : null}
      <div className="pftp-textfield__inputgroup">
        <input type="text" required="required" />
        <span className="pftp-textfield__inputgroup--highlight" />
        <span className="pftp-textfield__inputgroup--bar" />
        <label>{locals.label}</label>
      </div>
    </div>
  );
}
