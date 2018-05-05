import React, { Component } from 'react';
import { connect } from 'react-redux';
import { plantProjectsSelector } from '../../selectors/index';
import ActivePlantProject from './ActivePlantProject';

class TPOComponent extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <div>
        <div className="tpo_box">
          <p className="firstHeadline">WWF</p>
          <p>Plant for you</p>
          <hr />
          <ActivePlantProject
            userTpos={this.props.userTpos}
            plantProjects={this.props.plantProjects}
            id={this.props.id}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userTpos: state.entities.tpo,
    plantProjects: plantProjectsSelector(state)
  };
};
export default connect(mapStateToProps)(TPOComponent);
