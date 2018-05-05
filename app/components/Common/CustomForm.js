import React from 'react';
import {renderField, DefaultTheme} from 'liform-react';
import PropTypes from 'prop-types';

const CustomForm = props => {
  const {
    schema,
    handleSubmit,
    theme,
    error,
    submitting,
    buttonText,
    buttonWidth,
    headline,
  } = props;
  return (
    <div className="liform">
      <div className="row">
        <h1>{headline}</h1>
      </div>
      <form onSubmit={handleSubmit}>
        {renderField (schema, null, theme || DefaultTheme)}
        <div>{error && <strong>{error}</strong>}</div>
        <div
          className="row center-block margin-1"
          style={{width: buttonWidth + 'px'}}
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

CustomForm.propTypes = {
  schema: PropTypes.any,
  handleSubmit: PropTypes.func,
  theme: PropTypes.any,
  error: PropTypes.string,
  submitting: PropTypes.bool,
  buttonText: PropTypes.string,
  buttonWidth: PropTypes.string,
  headline: PropTypes.string,
};
