import React from 'react';
import PropTypes from 'prop-types';
import { questionmark_orange } from '../../assets';
import ReactTooltip from 'react-tooltip';
import { formatDate } from '../../utils/utils';
import { formatDateToMySQL } from '../../helpers/utils';

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
                {formatDate(
                  formatDateToMySQL(
                    new Date(
                      props.selectedDataPoint.year,
                      props.selectedDataPoint.month - 1,
                      1
                    )
                  ),
                  'LLLL yyyy'
                )}
              </p>
              <p>
                {props.minimumSpell}
                <b>
                  {aggregate.min
                    ? Math.round(aggregate.min * 100) / 100
                    : 'NaN'}
                </b>
                {props.averageSpell}
                <b>
                  {aggregate.avg
                    ? Math.round(aggregate.avg * 100) / 100
                    : 'NaN'}
                </b>
                {props.maximumSpell}
                <b>
                  {aggregate.max
                    ? Math.round(aggregate.max * 100) / 100
                    : 'NaN'}
                </b>
              </p>
            </div>
            <div className="text-center btn-container">
              <div className="tooltip">
                <a data-tip data-for="info-icon">
                  <img className="ndvi-img" src={questionmark_orange} />
                </a>
                <ReactTooltip id="info-icon" effect="solid" type="dark">
                  <span className="tooltip-text">
                    {props.toolTipHelpButtonSpell
                      ? props.toolTipHelpButtonSpell
                      : 'none'}
                  </span>
                </ReactTooltip>
              </div>
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
  ndviResulFromSpell: PropTypes.string,
  toolTipHelpButtonSpell: PropTypes.string
};
