import React from 'react'
import DonateTreesCardText from './DonateTreesCardText';
import DonateTreesCardFooter from './DonateTreesCardFooter'
import PropTypes from 'prop-types'
import DonateTreesCardLayout from './DonateTreesCardLayout'

const FeaturedProjects = props => {
    const {plantProjects, userTpos} = props

    let prev = plantProjects.map(arr => arr)
    let donated = []
    let Featured = 'is_certified'
    prev.map((value, index) => {
        if (value != undefined) {
        if (value[Featured]) {
          donated.push(
            <div className="item featured" key={index}>
                <DonateTreesCardLayout value={value} userTpos={userTpos}/>
            </div>
          )
        }
      }
    })
    return donated
}

FeaturedProjects.propTypes = {
    plantProjects: PropTypes.array.isRequired,
    userTpos: PropTypes.object.isRequired
}

export default FeaturedProjects