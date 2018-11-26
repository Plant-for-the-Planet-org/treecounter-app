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

export default class Imprint extends Component {
  GetImprintList() {
    return this.props.imprints.map(imprint => (
      <AccordionItem expanded={true}>
        <AccordionItemTitle>
          <div className="u-position-relative">{imprint.title}</div>
        </AccordionItemTitle>
        <AccordionItemBody>{renderHTML(imprint.description)}</AccordionItemBody>
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
          {i18n.t('label.imprint')}
          {/*<DescriptionHeading>*/}
          {/*{i18n.t('label.description1')}*/}
          {/*<a href={'https://' + i18n.t('label.description2')} target="_blank">*/}
          {/*{i18n.t('label.description2')}*/}
          {/*</a>{' '}*/}
          {/*{i18n.t('label.description3')}*/}
          {/*</DescriptionHeading>*/}
        </TextHeading>
        <CardLayout>
          <Accordion accordion={false}>{this.GetImprintList()}</Accordion>
        </CardLayout>
      </div>
    );
  }
}

Imprint.propTypes = {
  imprints: PropTypes.array.isRequired,
  loading: PropTypes.bool
};
