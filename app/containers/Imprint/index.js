import React from 'react';
import Imprint from '../../components/Imprint';
import { ImprintAction } from '../../actions/imprintAction';

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
        this.setState({
          loading: false,
          imprints: success.data
        });
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
