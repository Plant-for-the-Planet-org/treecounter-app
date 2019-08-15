import React from 'react';
import PropTypes from 'prop-types';

const TargetComment = ({ comment }) => (
  <div className="fixed-target-comment">{comment}</div>
);

export default TargetComment;

TargetComment.propTypes = {
  comment: PropTypes.string.isRequired
};
