import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { debug } from '../../debug';
import FAQ from '../../components/FAQ';
import { FAQAction } from '../../actions/faqAction';

class FAQContainer extends React.Component {
  static navigationOptions = {
    header: null
  };
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
        const faqs = _.sortBy(success.data, ['position', 'id']);
        this.setState({
          loading: false,
          faqs
        });
      },
      error => debug(error)
    );
  }

  render() {
    return (
      <FAQ
        navigation={this.props.navigation}
        faqs={this.state.faqs}
        loading={this.state.loading}
      />
    );
  }
}

export default FAQContainer;

FAQContainer.propTypes = {
  navigation: PropTypes.any
};
