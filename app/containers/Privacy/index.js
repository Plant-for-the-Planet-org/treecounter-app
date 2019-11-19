import React, { lazy } from 'react';

const Privacy = lazy(() => import('../../components/Privacy'));

import { PrivacyAction } from '../../actions/privacyAction';
import _ from 'lodash';

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
          console.log(err);
        }
      },
      error => console.log(error)
    );
  }

  render() {
    return (
      <Privacy privacies={this.state.privacy} loading={this.state.loading} />
    );
  }
}

export default PrivacyContainer;
