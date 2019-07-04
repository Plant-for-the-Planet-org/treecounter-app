import React from 'react';
import PropTypes from 'prop-types';
import parseDate from './NDVIfunctions/ParseDate';

const Info = props => {
  return (
    <div className="info-component">
      <ul>
        <li>
          <p>NDVI Result from {parseDate(props.month, props.year)}</p>
          <p>
            Min: <b>{props.ndviAggregate.min}</b> Average:{' '}
            <b>{props.ndviAggregate.avg}</b> Max:<b>
              {props.ndviAggregate.max}
            </b>
          </p>
        </li>
        <li>
          <button>?</button>
        </li>
      </ul>
    </div>
  );
};

export default Info;

Info.propTypes = {
  year: PropTypes.number,
  monthUid: PropTypes.number,
  month: PropTypes.number,
  carbon: PropTypes.number,
  ndviAggregate: PropTypes.object,
  min: PropTypes.number,
  avg: PropTypes.number,
  max: PropTypes.number
};
