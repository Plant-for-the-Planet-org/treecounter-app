import React from 'react';
import _ from 'lodash';
import { debug } from '../../debug';
import Privacy from '../../components/Privacy';
import { PrivacyAction } from '../../actions/privacyAction';

class PrivacyContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      privacy: []
    };
  }

  componentWillMount() {
    PrivacyAction().then(
      success => {
        try {
          const privacy = _.sortBy(success.data, ['position', 'id']);
          this.setState({
            loading: false,
            privacy: privacy
          });
        } catch (err) {
          debug(err);
        }
      },
      error => debug(error)
    );
  }

  render() {
    return (
      <Privacy
        privacies={this.state.privacy}
        loading={this.state.loading}
        navigation={this.props.navigation}
      />
    );
  }
}

export default PrivacyContainer;
