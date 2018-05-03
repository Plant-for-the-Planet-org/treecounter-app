import React from 'react'
import DonateTreesCardLayout from './DonateTreesCardLayout'
import PropTypes from 'prop-types'

const PreviouslyDonated = props => {
    const {userPlantProjectSelect, userTpos} = props

    const selectNoProjects = donated => {
        let NoProjects = -1
        let show = []
            if (NoProjects == -1) {
                show.push(donated)
            } else {
                for (var key in donated) {
                        if (key > NoProjects - 1) {
                        break;
                    }
                    else {
                         show.push(donated[key])
                    }
                }
            }
            return show
    }

    let prev = userPlantProjectSelect.map(arr => arr)
    let donated = []
    prev.map((value, index) => {
      if (value != undefined) {
        
        donated.push(
          <div className="item previously" key={index}>
                <DonateTreesCardLayout value={value} userTpos={userTpos}/>
          </div>
        )
      }
    })
    let show = selectNoProjects(donated)
    return show
}

PreviouslyDonated.propTypes = {
    userPlantProjectSelect: PropTypes.array.isRequired,
    userTpos: PropTypes.object.isRequired
}

export default PreviouslyDonated