import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { debug } from '../../debug';
import SuccessfullyActivatedAccount from '../../components/Authentication/SuccessfullyActivated';
import { accountActivate } from '../../actions/signupActions';

class SuccessfullyActivatedContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false
    };
  }

  UNSAFE_componentWillMount() {
    if (
      this.props.navigation
        ? this.props.navigation.getParam('token')
        : this.props.match.params.token
    ) {
      this.props
        .accountActivate(
          this.props.navigation
            ? this.props.navigation.getParam('token')
            : this.props.match.params.token
        )
        .then((/* res */) => {
          this.setState({ success: true });
        })
        .catch(err => {
          debug(err);
          this.setState({ success: false });
        });
    } else {
      this.setState({ success: true });
    }
  }
  render() {
    return <SuccessfullyActivatedAccount success={this.state.success} />;
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      accountActivate
    },
    dispatch
  );
};

export default connect(
  null,
  mapDispatchToProps
)(SuccessfullyActivatedContainer);

SuccessfullyActivatedContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string
    })
  }).isRequired,
  accountActivate: PropTypes.any,
  navigation: PropTypes.any
};
