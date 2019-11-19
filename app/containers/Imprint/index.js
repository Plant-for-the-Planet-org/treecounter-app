import React, { lazy } from 'react';

const Imprint = lazy(() => import('../../components/Imprint'));

import { ImprintAction } from '../../actions/imprintAction';
import _ from 'lodash';

class ImprintContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      imprints: []
    };
  }

  componentWillMount() {
    ImprintAction().then(
      success => {
        try {
          const imprint = _.sortBy(success.data, ['position', 'id']);
          this.setState({
            loading: false,
            imprints: imprint
          });
        } catch (err) {
          console.log(err);
          this.setState({
            loading: false
          });
        }
      },
      error => console.log(error)
    );
  }
  render() {
    return (
      <Imprint imprints={this.state.imprints} loading={this.state.loading} />
    );
  }
}

export default ImprintContainer;
