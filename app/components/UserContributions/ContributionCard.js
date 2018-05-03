import React, {Component} from 'react'
import PropTypes from 'prop-types'

import InlineLink from "../Common/InlineLink"

const ContributionCard = props => {
  const {contribution, updateContribution} = props

  return (
    <div style={{borderLeft: '5px solid ' + ((contribution.contribution_type == "donated") ? 'lightgreen' : (contribution.tree_count > 1 ? 'orange': 'lightblue'))}} key={`contribution-${contribution.id}`} className={`contribution-container__card ${contribution.contribution_type}`}>
        <div className="contribution-container__card--header">
          <div><b className="cx-card-head">{contribution.tree_count} {contribution.tree_type} </b></div>
        </div>
        <div className="contribution-container__card--info">
          <div>{contribution.geo_latitude},{contribution.geo_longitude}</div>
          <div>{contribution.plant_date}</div>
        </div>
        <div className="contribution-container__card--tag">
          <div>{contribution.contribution_type}</div>
        </div>
      <div className="contribution-container__card--footer">&nbsp;</div>
    </div>
  )
}

ContributionCard.propTypes = {
  contribution: PropTypes.object.isRequired,
  updateContribution: PropTypes.func.isRequired
}

export default ContributionCard
