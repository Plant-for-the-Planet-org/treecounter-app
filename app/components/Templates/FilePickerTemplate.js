import React from 'react';
import { getImageUrl } from '../../actions/apiRouting';
import i18n from '../../locales/i18n';

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
  let error = locals.hasError;
  let label;
  if (locals.label !== 'label.upload_profile_picture') {
    if (!locals.value) {
      label = (
        <span className="value-label">{i18n.t('label.select_file')}</span>
      );
    } else {
      label = (
        <img
          src={
            !locals.value.includes('base64')
              ? getImageUrl('project', 'small', locals.value)
              : locals.value
          }
        />
      );
    }
  } else {
    label = null;
  }
  return (
    <div className="filepicker-wrapper">
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
          {i18n.t(locals.label)}
        </button>
        {label}
      </div>
      {error && locals.error ? locals.error : null}
    </div>
  );
}
