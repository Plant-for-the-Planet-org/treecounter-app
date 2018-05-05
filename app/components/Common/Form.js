import React from 'react';
import LiForm from 'liform-react';
import PropTypes from 'prop-types';
import CustomForm from './CustomForm';

const Form = props => {
  const {
    schema,
    onSubmit,
    headline,
    buttonText,
    buttonWidth,
    passparam
  } = props;

  return (
    <LiForm
      schema={schema}
      onSubmit={user => onSubmit(user, passparam)}
      baseForm={CustomForm}
      headline={headline}
      buttonText={buttonText}
      buttonWidth={buttonWidth}
    />
  );
};

Form.propTypes = {
  schema: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default Form;
