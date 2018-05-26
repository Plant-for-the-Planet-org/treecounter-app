import React from 'react';
import PropTypes from 'prop-types';

const UserSynopsis = ({ synopsis1, synopsis2 }) => {
  return (
    <div className="tree-counter-user-synopsis">
      {synopsis1 ? <div>{synopsis1}</div> : null}
      {synopsis2 ? <div>{synopsis2}</div> : null}
    </div>
  );
};

UserSynopsis.propTypes = {
  synopsis1: PropTypes.string,
  synopsis2: PropTypes.string
};

export default UserSynopsis;
