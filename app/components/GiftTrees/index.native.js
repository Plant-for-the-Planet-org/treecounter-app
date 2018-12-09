import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import GiftTabView from './GiftTabs.native';
import { updateRoute } from '../../helpers/routerHelper';

export default class GiftTrees extends Component {
  constructor(props) {
    super(props);
    this.openProjects = this.openProjects.bind(this);
  }
  openProjects(formValue) {
    // console.log('Open Project called up ', formValue);
    this.props.openProjects(formValue);
  }
  render() {
    return <GiftTabView openProjects={this.openProjects} {...this.props} />;
  }
}

GiftTrees.propTypes = {
  selectedProject: PropTypes.object,
  selectedTpo: PropTypes.object,
  currentUserProfile: PropTypes.object,
  currencies: PropTypes.object,
  gift: PropTypes.func,
  paymentStatus: PropTypes.object,
  paymentClear: PropTypes.func,
  plantProjectClear: PropTypes.func
};
