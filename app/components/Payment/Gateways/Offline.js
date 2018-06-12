import React from 'react';
import PropTypes from 'prop-types';

const Offline = ({ account }) => {
  return (
    <div>
      <label>Money Transfer</label>
      <form>
        <div>{account.full_text}</div>
        <div>
          Confirmation checkbox and submit button go here. If user clicks the
          submit button and has not confirmed the via checkbox, the onError
          callback should be used.
        </div>
      </form>
    </div>
  );
};

Offline.propTypes = {
  account: PropTypes.object.isRequired,
  onSuccess: PropTypes.func,
  onError: PropTypes.func
};

export default Offline;
