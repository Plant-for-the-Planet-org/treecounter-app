import React from 'react';
import { renderField, DefaultTheme } from 'liform-react';

const CustomForm = props => {
  const {
    schema,
    handleSubmit,
    theme,
    error,
    submitting,
    buttonText,
    buttonWidth,
    headline
  } = props;
  return (
    <div className="liform">
      <div className="row">
        <h1>{headline}</h1>
      </div>
      <form onSubmit={handleSubmit}>
        {renderField(schema, null, theme || DefaultTheme)}
        <div>{error && <strong>{error}</strong>}</div>
        <div
          className="row center-block margin-1"
          style={{ width: buttonWidth + 'px' }}
        >
          <button
            className="button button-pill"
            type="submit"
            disabled={submitting}
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomForm;
