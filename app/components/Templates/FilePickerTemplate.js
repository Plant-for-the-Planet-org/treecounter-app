import React from 'react';

export function FilePickerTemplate(locals) {
  let fileName;
  console.log('FilePickerTemplate', locals);
  function onChange($event) {
    let value;
    fileName = $event.target.files[0].name;
    locals.attrs.placeholder = fileName;
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
      <input
        className="file-input"
        ref="input"
        type="file"
        onChange={onChange}
      />
      <button
        className="browse-button"
        onClick={() => console.log('clicked Browse', this.refs)}
      >
        Browse
      </button>
      <span className="value-label">
        {locals.value ? locals.value : 'Select a file from computer'}
      </span>
    </div>
  );
}
