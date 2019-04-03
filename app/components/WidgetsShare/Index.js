import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import TextHeading from '../../components/Common/Heading/TextHeading';
import DescriptionHeading from '../../components/Common/Heading/DescriptionHeading';
import i18n from '../../locales/i18n.js';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/xml';
import dark from 'react-syntax-highlighter/dist/esm/styles/hljs/lightfair';

SyntaxHighlighter.registerLanguage('xml', js);
import CardLayout from '../Common/Card';

const widgetList = [
  { type: 'basic', label: 'label.widget_basic', script: 'widget.js' },
  {
    type: 'treecounter',
    label: 'label.widget_global_tree_counter',
    script: 'treecounterwidget.js'
  },
  {
    type: 'treecounter-standard',
    label: 'label.widget_standard_tree_counter',
    script: 'treecounterwidget.js'
  },
  {
    type: 'treecounter-progress',
    label: 'label.widget_progress_tree_counter',
    script: 'progressbarwidget.js'
  },
  {
    type: 'donateTrees',
    label: 'label.widget_donate_trees',
    script: 'donatetreewidget.js',
    tpo: true
  }
];
export default class WidgetShare extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeWidget: widgetList[0]
    };
  }
  handleWidgetChoiceChange = widget => {
    this.setState({ activeWidget: widget });
  };

  render() {
    console.log(this.props);
    const widgetCode = `
    <blockquote
      data-treecounterId="${this.props.currentUserProfile.treecounter.slug}"
      pftp
      data-widget-type="${this.state.activeWidget.type}"
      cite="${this.props.serverName}" >
        ${this.state.activeWidget.type} widget loading...
    </blockquote>
    <script
      type="text/javascript"
      src="${this.props.serverName}/${this.state.activeWidget.script}">
    </script>
    `;
    const iframeContent = `<div style="height:300px">${widgetCode}</div>`;
    return (
      <div className="app-container__content--center sidenav-wrapper pftp-widgets-share-container">
        <TextHeading>
          {i18n.t('label.widget_share')}
          <DescriptionHeading>
            {i18n.t('label.widget_share_description')}
          </DescriptionHeading>
        </TextHeading>
        <CardLayout className={'pftp-widget-card'}>
          <h6> {i18n.t('label.widget_share_choose_widget')}</h6>
          <div className={'pftp-widgets'}>
            <div className="pftp-widgets__type">
              {widgetList.map(widget => {
                return (
                  <label
                    key={widget.type}
                    onClick={() => this.handleWidgetChoiceChange(widget)}
                    className={
                      'radio pftp-widgets__type--option ' +
                      (this.state.activeWidget.type === widget.type
                        ? 'active'
                        : '')
                    }
                  >
                    <input
                      type="radio"
                      value={widget.type}
                      checked={this.state.activeWidget.type === widget.type}
                      onChange={() => this.handleWidgetChoiceChange(widget)}
                    />
                    <span>{i18n.t(widget.label)}</span>
                  </label>
                );
              })}
            </div>
          </div>
          <h6> {i18n.t('label.widget_share_copy_paste_html_snippet')}</h6>
          <div className={'pftp-widget-html-snippet'}>
            <SyntaxHighlighter language="xml" style={dark}>
              {widgetCode}
            </SyntaxHighlighter>
          </div>
        </CardLayout>
        <CardLayout className={'pftp-widget-card'}>
          <h6>{i18n.t('label.widget_preview')}</h6>
          <iframe
            width="200"
            height="200"
            id="pftp-widgets-preview"
            ref="iframe"
            srcDoc={iframeContent}
          />
        </CardLayout>
      </div>
    );
  }
}

WidgetShare.propTypes = {
  currentUserProfile: PropTypes.object,
  serverName: PropTypes.string
};
