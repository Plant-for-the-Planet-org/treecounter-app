import React from 'react';

import FAQ from '../../components/FAQ';
import { FAQAction } from '../../actions/faqAction';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class FAQContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      faqs: []
    };
  }

  componentWillMount() {
    FAQAction().then(
      success => {
        this.setState({
          loading: false,
          faqs: success.data
        });
      },
      error => console.log(error)
    );
  }

  render() {
    return this.state.loading ? (
      <LoadingIndicator />
    ) : (
      <FAQ faqs={this.state.faqs} />
    );
  }
}

export default FAQContainer;
