import React, { Component } from 'react';
import t from 'tcomb-form';
import PropTypes from 'prop-types';

import CardLayout from '../Common/Card';
import ContentHeader from '../Common/ContentHeader';
import PrimaryButton from '../Common/Button/PrimaryButton';
import TextSpan from '../Common/Text/TextBlock';

import { pledge_highest, pledge_latest } from '../../assets';
import { getImageUrl } from '../../actions/apiRouting';
import { getDocumentTitle } from '../../helpers/utils';
import { delimitNumbers } from '../../utils/utils';
import Pulse from 'react-reveal/Pulse';

import {
  pledgeFormSchema,
  pledgeSchemaOptions
} from '../../server/parsedSchemas/pledge';
import i18n from '../../locales/i18n';

let TCombForm = t.form.Form;

const formLayout = locals => {
  return (
    <div className="pledge-form-layout">
      <div className="row">
        <div className="half">{locals.inputs.firstname}</div>
        <div className="half">{locals.inputs.lastname}</div>
      </div>
      <div>{locals.inputs.email}</div>
      <div className="tree-count">{locals.inputs.treeCount}</div>
    </div>
  );
};

const allSchemaOptions = {
  template: formLayout,
  ...pledgeSchemaOptions
};

export default class Pledge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {}
    };
  }

  onFormSubmit() {
    let value = this.refs.pledgeForm.getValue();
    if (value) {
      this.props.postPledge(value);
      this.setState({ value: {} });
    }
  }
  onFormChange(value) {
    this.setState({ value }); // <- keep track of value changes
  }
  render() {
    let selectedPledge = {};
    if (
      this.props.pledgeEvents &&
      this.props.pledgeEvents.pledgeEvents.length > 0
    ) {
      selectedPledge = this.props.pledgeEvents.pledgeEvents.filter(
        val => val.slug === this.props.eventSlug
      )[0];
    }
    document.title = getDocumentTitle(selectedPledge.name);
    let i;
    return this.props.pledges && this.props.pledges.total !== undefined ? (
      <div className="sidenav-wrapper app-container__content--center">
        <div className="conference_heading">
          <div className="esri_logo_background">
            <img src={getImageUrl('event', 'thumb', selectedPledge.image)} />
          </div>
          {selectedPledge.name}
          <br />
          <span className="total_number">
            {delimitNumbers(parseInt(this.props.pledges.total))}{' '}
            {i18n.t('label.treesPledged')}
          </span>
        </div>

        <div className="pledge_content--center">
          <div className="row">
            <div className="recent-pledges">
              <div className="recent-pledges-table">
                <div className="pledges-header">
                  {/* <img src={pledge_latest} /> */}
                  <span style={{ fontWeight: 'bold' }}>
                    {i18n.t('label.most_recent')}
                  </span>
                </div>
                <div className="pledges-list">
                  {
                    ((i = 1),
                    this.props.pledges.latestPledgeEvents.map(pledge => (
                      <Pulse key={pledge.id}>
                        <div className={'row-list-item '}>
                          <span>
                            <span className="row-list-item-rank">{i++}</span>
                            <span className="row-list-item-name">
                              {pledge.isAnonymous
                                ? 'Anonymous'
                                : pledge.firstname + ' ' + pledge.lastname}
                            </span>
                          </span>
                          <span className="row-list-item-treeCount">
                            {delimitNumbers(parseInt(pledge.treeCount))}{' '}
                            <span
                              style={{
                                fontSize: 10,
                                color: 'rgba(0, 0, 0, 0.6)',
                                fontWeight: 'normal',
                                marginLeft: 4
                              }}
                            >
                              trees
                            </span>
                          </span>
                        </div>
                      </Pulse>
                    )))
                  }
                </div>
              </div>
            </div>

            <div className="recent-pledges">
              <div className="recent-pledges-table">
                <div className="pledges-header">
                  {/* <img src={pledge_highest} /> */}
                  <span style={{ fontWeight: 'bold' }}>
                    {i18n.t('label.biggest_pledges')}
                  </span>
                </div>
                <div className="pledges-list">
                  {
                    ((i = 1),
                    this.props.pledges.highestPledgeEvents.map(pledge => (
                      <Pulse key={pledge.id}>
                        <div
                          className={
                            i == 1
                              ? 'row-list-item row-gold'
                              : 'row-list-item ' && i == 2
                                ? 'row-list-item row-silver'
                                : 'row-list-item ' && i == 3
                                  ? 'row-list-item row-bronze'
                                  : 'row-list-item '
                          }
                        >
                          <span>
                            <span className="row-list-item-rank">{i++}</span>
                            <span className="row-list-item-name">
                              {pledge.isAnonymous
                                ? 'Anonymous'
                                : pledge.firstname + ' ' + pledge.lastname}
                            </span>
                          </span>
                          <span className="row-list-item-treeCount">
                            {delimitNumbers(parseInt(pledge.treeCount))}{' '}
                            <span
                              style={{
                                fontSize: 10,
                                color: 'rgba(0, 0, 0, 0.6)',
                                fontWeight: 'normal',
                                marginLeft: 4
                              }}
                            >
                              trees
                            </span>
                          </span>
                        </div>
                      </Pulse>
                    )))
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {this.props.pledges.description ? (
              <div
                className="event-description"
                style={{ maxWidth: '70%', margin: 'auto' }}
              >
                {this.props.pledges.description}
              </div>
            ) : null}
          </div>
          <CardLayout className="pledge-form">
            <ContentHeader caption={i18n.t('label.pledge_trees')} />
            <TCombForm
              ref="pledgeForm"
              type={pledgeFormSchema}
              options={allSchemaOptions}
              value={this.state.value}
              onChange={value => this.onFormChange(value)}
            />
            <PrimaryButton onClick={() => this.onFormSubmit()}>
              {i18n.t('label.pledge')}
            </PrimaryButton>
            <TextSpan>{i18n.t('label.pledge_des')}</TextSpan>
          </CardLayout>
        </div>
      </div>
    ) : null;
  }
}

Pledge.propTypes = {
  pledges: PropTypes.object,
  eventSlug: PropTypes.string,
  postPledge: PropTypes.func,
  pledgeEvents: PropTypes.any
};
