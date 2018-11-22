import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppPayment from '../../components/Payment/AppPayments';
import { getPaymentInfo } from '../../actions/paymentAction';

export default class AppPaymentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentInfo: null
    };
  }

  componentWillMount() {
    getPaymentInfo(this.props.match.params.donationContribution).then(
      ({ data }) => {
        this.setState({
          paymentInfo: data
        });
      }
    );
  }
  render() {
    return <AppPayment paymentInfo={this.state.paymentInfo} />;
  }
}

AppPaymentContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      donationContribution: PropTypes.string
    })
  }).isRequired
};
