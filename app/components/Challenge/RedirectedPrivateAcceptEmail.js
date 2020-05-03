import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextHeading from '../Common/Heading/TextHeading';
import CardLayout from '../Common/Card';
import TextBlock from '../Common/Text/TextBlock';
import i18n from '../../locales/i18n';

export default class RedirectedPrivateAcceptEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: false
    };
  }

  UNSAFE_componentWillMount() {
    this.props.acceptChallenge();
  }

  render() {
    return (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>{i18n.t('label.challenge_heading')}</TextHeading>
        <CardLayout>
          <TextBlock>{i18n.t('label.challenge_accept')}</TextBlock>
          <div className={'gap'} />
        </CardLayout>
      </div>
    );
  }
}

RedirectedPrivateAcceptEmail.propTypes = {
  acceptChallenge: PropTypes.func
};
