import React from 'react'
import PropTypes from 'prop-types'

import ActionButton from '../Common/ActionButton'
import ContentBox from '../Common/ContentBox'
import ContentHeader from '../Common/ContentHeader'
import PlantProjectCarousel from './PlantProjectCarousel'

/**
 * see: https://github.com/Plant-for-the-Planet-org/treecounter-platform/wiki/Component---TpoDonationPlantProjectSelector
 *
 * The currently visible PlantProject is either initialized via prop 'defaultPlantProjectId' or set to be the first
 * (and maybe only) PlantProject. It is updated by the PlantProjectCarousel 'onChange' callback.
 *
 * When the 'donate' button is clicked, the id of the currently visible PlantProject is provided to the callback
 * function 'onSelect' so the parent component can take appropriate action.
 */
class TpoDonationPlantProjectSelector extends React.Component {

  constructor(props) {
    super(props)
    this.onCarouselChange = this.onCarouselChange.bind(this)

    let defaultPlantProjectId = props.defaultPlantProjectId
    if (Array.isArray(props.plantProjects)) {
      if (null === defaultPlantProjectId) {
        defaultPlantProjectId = props.plantProjects.find(() => true).id
      }
    }

    this.state = {currentPlantProjectId: defaultPlantProjectId}
  }

  onCarouselChange(newPlantProjectId) {
    console.log('onCarouselChange:: currentPlantProjectId', newPlantProjectId)
    this.setState({currentPlantProjectId: newPlantProjectId})
  }

  render() {
    const {plantProjects, onSelect} = this.props
    const caption = plantProjects.length === 1 ? 'caption.plant_project' : 'caption.plant_projects'
    const TagName = 'PlantProjectFull'

    return (<ContentBox>
      <ContentHeader caption={caption}/>
      {1 === plantProjects.length ?
        <TagName plantProject={plantProjects.find(() => true)} showTpoName={false} expanded={false}/> :
        <PlantProjectCarousel contentTag={TagName} showTpoName={false} plantProjects={plantProjects}
                              currentPlantProjectId={this.state.currentPlantProjectId}
                              onChange={this.onCarouselChange}/>
      }
      <ActionButton caption={'button.label.donate'} onClick={() => onSelect(this.state.currentPlantProjectId)}/>
    </ContentBox>)
  }
}

TpoDonationPlantProjectSelector.propTypes = {
  plantProjects: PropTypes.array.isRequired,
  defaultPlantProjectId: PropTypes.number,
  onSelect: PropTypes.func.isRequired
}

export default TpoDonationPlantProjectSelector
