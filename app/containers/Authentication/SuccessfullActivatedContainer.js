import React from 'react';
import PropTypes from 'prop-types';

import SuccessfullyActivatedAccount from '../../components/Authentication/SuccessfullyActivated';
import { accountActivate } from '../../actions/signupActions';

export default class SuccessfullyActivatedContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false
    };
  }

  componentWillMount() {
    accountActivate(this.props.match.params.token).then(res =>
      this.setState({ success: true })
    );
  }
  render() {
    return this.state.success ? <SuccessfullyActivatedAccount /> : null;
  }
}

SuccessfullyActivatedContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string
    })
  }).isRequired
};
