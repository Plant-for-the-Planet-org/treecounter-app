import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import PlantProjectFull from './PlantProjectFull'

const PlantProjectCarousel = (props) => {

  const {plantProjects, onChange, contentTag, tpoName} = props

  // see: https://medium.com/@Carmichaelize/dynamic-tag-names-in-react-and-jsx-17e366a684e9
  const TagName = contentTag
  console.log(onChange)
  console.log('TagName', TagName)

  // add navigation buttons that will trigger calls to 'onChange' callback
  return (<div>
    {plantProjects.map(plantProject => (<Link style={{fontSize: '.8em'}} to="#"
                                              onClick={() => onChange(plantProject.id)}>{plantProject.id} | </Link>))
    }
    {plantProjects.map(plantProject => (<div>
        <hr/>
        <PlantProjectFull key={`plantProject-${plantProject.id}`} expanded={false} tpoName={tpoName}
                          plantProject={plantProject}/>
      </div>)
    )}
  </div>)
}

PlantProjectCarousel.propTypes = {
  contentTag: PropTypes.string.isRequired,
  tpoName: PropTypes.string,
  plantProjects: PropTypes.array.isRequired,
  currentPlantProjectId: PropTypes.number,
  onChange: PropTypes.func.isRequired
}

export default PlantProjectCarousel
