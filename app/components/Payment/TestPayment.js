import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectPlantProjectAction } from '../../actions/selectPlantProjectAction';
import DonationProcess from './DonationProcess';

class TestPayment extends React.Component {
  constructor(props) {
    super(props);
    console.log('###### TestPayment');

    this.state = {
      paymentConfig: {}
    };
  }

  // handleClick() {
  //   console.log('clicked')
  //   //this.props.dispatch(setUserLogOut());
  //
  //   this.props.dispatch(followUnSubscribeAction(5))
  // }

  componentDidMount() {
    console.log('this.props', this.props);
    this.props.selectPlantProjectAction(1);
  }

  render() {
    return <DonationProcess />;
  }
}

TestPayment.propTypes = {
  selectPlantProjectAction: PropTypes.func
};

const mapDispatchToProps = dispatch => {
  return {
    selectPlantProjectAction: plantProjectId =>
      dispatch(selectPlantProjectAction(plantProjectId))
  };
};

export default connect(null, mapDispatchToProps)(TestPayment);
