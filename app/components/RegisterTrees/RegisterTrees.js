import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import LiForm from 'liform-react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import CustomForm from '../Common/CustomForm';
import LoadingIndicator from '../Common/LoadingIndicator';
import {registerTree} from '../../actions/registerTree';
import {RegisterTreeSchema} from '../../layouts/registerTreesSchema';
import Map from './map';
import {userTreecounterSelector} from '../../selectors/index';
import * as constants from '../../SupportedLanguages/en';

class RegisterTree extends Component {
  constructor () {
    super ();
    this.state = {
      loading: false,
      schema: {},
      mapCoordinates: {
        geoLatitude: 0,
        geoLongitude: 0,
      },
      treeCount: 'individual',
      countrySelected: 'DE',
    };
  }

  componentWillMount () {
    this.setState ({loading: true});
    RegisterTreeSchema ()
      .then (({data}) => {
        console.log ('Data fetched: ', data);

        // Remove lat and long and represent through maps
        delete data.schema.properties.geoLatitude;
        delete data.schema.properties.geoLongitude;
        delete data.schema.properties.country;

        let index = data.schema.required.indexOf ('treeCount');
        if (index !== -1) data.schema.required.splice (index, 1);

        index = data.schema.required.indexOf ('country');
        if (index !== -1) data.schema.required.splice (index, 1);

        // Set Form Schema
        this.setState ({
          schema: data.schema,
          loading: false,
        });
      })
      .catch (error => console.log (error));
  }

  onMapSelect (value) {
    console.log (value);
    this.setState ({
      mapCoordinates: {
        geoLatitude: value.latitude,
        geoLongitude: value.longitude,
      },
      countrySelected: value.country.substring (0, 2),
    });
  }

  handleTreeCountOptionChange (changeEvent) {
    this.setState ({treeCount: changeEvent.target.value});
  }

  handleRegisterTreeSubmit (plantContribution) {
    plantContribution.geoLatitude = this.state.mapCoordinates.geoLatitude;
    plantContribution.geoLongitude = this.state.mapCoordinates.geoLongitude;
    plantContribution.country = this.state.countrySelected;

    if (this.state.treeCount === 'individual') plantContribution.treeCount = 1;
    console.log (plantContribution);
    this.props.registerTree (plantContribution, this.props.treecounter.id);
  }

  render () {
    console.log ('Register trees render');
    return (
      <div>
        <div className="row flex-row f-center">
          <h3 className="cs-heading">
            {constants.formStrings.registerPlantedTrees}
          </h3>
        </div>
        <div className="register-tree">
          <form className="register-tree__type">
            <label
              className={
                'radio register-tree__type--option ' +
                  (this.state.treeCount === 'individual' ? 'active' : '')
              }
            >
              <input
                type="radio"
                value="individual"
                checked={this.state.treeCount === 'individual'}
                onChange={e => this.handleTreeCountOptionChange (e)}
              />
              <span>{constants.formStrings.individual}</span>
            </label>
            <label
              className={
                'radio register-tree__type--option ' +
                  (this.state.treeCount === 'many' ? 'active' : '')
              }
            >
              <input
                type="radio"
                value="many"
                checked={this.state.treeCount === 'many'}
                onChange={e => this.handleTreeCountOptionChange (e)}
              />
              <span>{constants.formStrings.many}</span>
            </label>
          </form>
        </div>
        <Map onMapsClick={e => this.onMapSelect (e)} />
        <div
          className={
            'register-tree__form ' +
              (this.state.treeCount === 'individual' ? 'hide-treecount' : '')
          }
        >
          {this.state.loading
            ? <div className="center-wrapper">
                <LoadingIndicator />
              </div>
            : <LiForm
                schema={this.state.schema}
                onSubmit={e => this.handleRegisterTreeSubmit (e)}
                baseForm={CustomForm}
                headline=""
                buttonText="Register"
                buttonWidth="240"
              />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    treecounter: userTreecounterSelector (state),
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators ({registerTree}, dispatch);
};

export default connect (mapStateToProps, mapDispatchToProps) (RegisterTree);

RegisterTree.propTypes = {
  registerTree: PropTypes.func.isRequired,
  treecounter: PropTypes.object,
};
