import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RegisterTrees from '../../components/RegisterTrees/index';
import { registerTree } from '../../actions/registerTree';
import { userTreecounterSelector } from '../../selectors/index';

class RegisterTreesContainer extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      schema: {},
      mapCoordinates: {
        geoLatitude: 0,
        geoLongitude: 0
      },
      treeCount: 'individual',
      countrySelected: 'DE'
    };
  }

  onMapSelect(value) {
    console.log(value);
    this.setState({
      mapCoordinates: {
        geoLatitude: value.latitude,
        geoLongitude: value.longitude
      },
      countrySelected: value.country.substring(0, 2)
    });
  }

  handleTreeCountOptionChange(changeEvent) {
    this.setState({ treeCount: changeEvent.target.value });
  }

  handleRegisterTreeSubmit(plantContribution) {
    plantContribution.geoLatitude = this.state.mapCoordinates.geoLatitude;
    plantContribution.geoLongitude = this.state.mapCoordinates.geoLongitude;
    plantContribution.country = this.state.countrySelected;

    if (this.state.treeCount === 'individual') plantContribution.treeCount = 1;
    console.log(plantContribution);
    this.props.registerTree(plantContribution, this.props.treecounter.id);
  }

  render() {
    console.log('Register trees render');
    return <RegisterTrees />;
  }
}

const mapStateToProps = state => {
  return {
    treecounter: userTreecounterSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ registerTree }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(
  RegisterTreesContainer
);

RegisterTreesContainer.propTypes = {
  registerTree: PropTypes.func.isRequired,
  treecounter: PropTypes.object
};
