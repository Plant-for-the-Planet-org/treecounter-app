import React from 'react';
import PropTypes from 'prop-types';
import parseDate from './NDVIfunctions/parseDate';

const Info = props => {
  const aggregate = props.selectedDataPoint.ndviAggregate;

  return (
    <div className="info-component">
      {aggregate && (
        <React.Fragment>
          <div className="row">
            <div className="flex-1">
              <p>
                {props.ndviResulFromSpell}{' '}
                {parseDate(
                  props.selectedDataPoint.month,
                  props.selectedDataPoint.year
                )}
              </p>
              <p>
                {props.minimumSpell}
                <b>{aggregate.min ? aggregate.min : 'NaN'}</b>
                {props.averageSpell}
                <b>{aggregate.avg ? aggregate.avg : 'NaN'}</b>
                {props.maximumSpell}
                <b>{aggregate.max ? aggregate.max : 'NaN'}</b>
              </p>
            </div>
            <div className="flex-1 text-center btn-container">
              <button>?</button>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Info;

Info.propTypes = {
  selectedDataPoint: PropTypes.object,
  year: PropTypes.number,
  monthUid: PropTypes.number,
  month: PropTypes.number,
  carbon: PropTypes.number,
  ndviAggregate: PropTypes.object,
  min: PropTypes.number,
  avg: PropTypes.number,
  max: PropTypes.number,
  minimumSpell: PropTypes.string,
  averageSpell: PropTypes.string,
  maximumSpell: PropTypes.string,
  ndviResulFromSpell: PropTypes.string
};
