import React from 'react';

export function TextInputTemplate(locals) {
  return (
    <div>
      {locals.config.iconUrl ? <img src={locals.config.iconUrl} /> : null}
      <input placeholder={locals.placeholder} />
    </div>
  );
}
