import React from 'react';

export function FilePickerTemplate(locals) {
  function onChange($event) {
    let value;
    let fileReader = new FileReader();
    fileReader.addEventListener('load', event => {
      value = event.target.result;
      locals.onChange(value);
    });
    if ($event.target.files && $event.target.files[0]) {
      fileReader.readAsDataURL($event.target.files[0]);
    } else locals.onChange($event.target.value);
  }

  return (
    <div className="pftp-filepicker">
      <input type="file" onChange={onChange} />
    </div>
  );
}
