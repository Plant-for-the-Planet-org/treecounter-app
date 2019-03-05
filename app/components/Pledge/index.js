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
    return this.props.pledges && this.props.pledges.total !== undefined ? (
      <div className="sidenav-wrapper app-container__content--center">
        <div className="conference_heading">
          <div className="esri_logo_background">
            <img src={getImageUrl('event', 'thumb', selectedPledge.image)} />
          </div>
          {selectedPledge.name}
        </div>
        <CardLayout className="total_trees">
          <span className="total_number">
            {parseInt(this.props.pledges.total).toLocaleString('en', {
              useGrouping: true
            })}
          </span>
          <span className="total_text">{i18n.t('label.total_trees')}</span>
        </CardLayout>
        <div className="pledge_content--center">
          <div className="row">
            <CardLayout className="recent-pledges">
              <div className="before_table_header">
                <img src={pledge_latest} />
                <span>{i18n.t('label.most_recent')}</span>
              </div>
              <div className="recent-pledges-table">
                <div className="pledges-header row-list-item">
                  <span>{i18n.t('label.name')}</span>
                  <span>{i18n.t('label.trees')}</span>
                </div>
                <div className="pledges-list">
                  {this.props.pledges.latest.map(pledge => (
                    <div className="row-list-item" key={pledge.id}>
                      <span>{pledge.firstname + ' ' + pledge.lastname}</span>
                      <span>
                        {parseInt(pledge.treeCount).toLocaleString('en')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardLayout>
            <CardLayout className="recent-pledges">
              <div className="before_table_header">
                <img src={pledge_highest} />
                <span>{i18n.t('label.biggest_pledges')}</span>
              </div>
              <div className="recent-pledges-table">
                <div className="pledges-header row-list-item">
                  <span>{i18n.t('label.name')}</span>
                  <span>{i18n.t('label.trees')}</span>
                </div>
                <div className="pledges-list">
                  {this.props.pledges.highest.map(pledge => (
                    <div className="row-list-item" key={pledge.id}>
                      <span>{pledge.firstname + ' ' + pledge.lastname}</span>
                      <span>
                        {parseInt(pledge.treeCount).toLocaleString('en')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardLayout>
          </div>
          <CardLayout className="pledge-form">
            <ContentHeader caption={'Pledge Trees'} />
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
