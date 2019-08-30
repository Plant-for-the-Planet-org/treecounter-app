import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from 'react-accessible-accordion';
import renderHTML from 'react-render-html';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import TextHeading from '../../components/Common/Heading/TextHeading';
import DescriptionHeading from '../../components/Common/Heading/DescriptionHeading';
import i18n from '../../locales/i18n.js';

import CardLayout from '../Common/Card';

export default class Privacy extends Component {
  GetPrivacyList() {
    return this.props.privacies.map((privacy, i) => (
      <AccordionItem expanded key={'privacy' + i}>
        <AccordionItemTitle>
          <div className="u-position-relative">{privacy.heading}</div>
        </AccordionItemTitle>
        <AccordionItemBody>{renderHTML(privacy.description)}</AccordionItemBody>
      </AccordionItem>
    ));
  }
  render() {
    return this.props.loading ? (
      <div className="app-container__content--center sidenav-wrapper">
        <LoadingIndicator />
      </div>
    ) : (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>
          {i18n.t('label.privacy')}
          {/*<DescriptionHeading>*/}
          {/*{i18n.t('label.description1')}*/}
          {/*<a href={'https://' + i18n.t('label.description2')} target="_blank">*/}
          {/*{i18n.t('label.description2')}*/}
          {/*</a>{' '}*/}
          {/*{i18n.t('label.description3')}*/}
          {/*</DescriptionHeading>*/}
        </TextHeading>
        <CardLayout>
          <Accordion accordion={false}>{this.GetPrivacyList()}</Accordion>
        </CardLayout>
      </div>
    );
  }
}

Privacy.propTypes = {
  privacies: PropTypes.array.isRequired,
  loading: PropTypes.bool
};
