import React from 'react';
import PropTypes from 'prop-types';

import SuccessfullyActivatedAccount from '../../components/Authentication/SuccessfullyActivated';
import { accountActivate } from '../../actions/signupActions';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { updateRoute } from '../../helpers/routerHelper';

export default class SuccessfullyActivatedContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false,
      loading: true
    };
  }

  componentWillMount() {
    accountActivate(this.props.match.params.token)
      .then(res => {
        const { data } = res.data;
        if (data.routeName !== 'app_userHome') {
          updateRoute(data.routeName, null, null, data.routeParams);
        } else {
          this.setState({ success: true, loading: false });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ success: false, loading: false });
      });
  }
  render() {
    return !this.state.loading ? (
      <SuccessfullyActivatedAccount success={this.state.success} />
    ) : (
      <div className="sidenav-wrapper">
        <LoadingIndicator />
      </div>
    );
  }
}

SuccessfullyActivatedContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string
    })
  }).isRequired
};
