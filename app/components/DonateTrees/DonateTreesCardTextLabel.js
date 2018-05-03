import React from 'react'
import PropTypes from 'prop-types'

const DonateTreesCardTextLabel = props => {
    return (
        <small>
            <span className="text-left left-text">
                {props.label}
            </span> 
            <span className="text-right right-text">
                {props.counter}
            </span>
        </small>
    )
}

DonateTreesCardTextLabel.propTypes = {
    label: PropTypes.string.isRequired,
    counter: PropTypes.number
}

export default DonateTreesCardTextLabel