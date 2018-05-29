import React from 'react';

export function FilePickerTemplate(locals) {
  function onChange($event) {
    locals.onChange($event.target.value);
  }

  return (
    <div className="pftp-filepicker">
      <input type="file" onChange={onChange} />
    </div>
  );
}
