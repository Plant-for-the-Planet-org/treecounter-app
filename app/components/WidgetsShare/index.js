import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
//import { debug } from '../../debug';
import TextHeading from '../../components/Common/Heading/TextHeading';
import DescriptionHeading from '../../components/Common/Heading/DescriptionHeading';
import i18n from '../../locales/i18n.js';
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
    //debug(this.props);
    const widgetCode = `
    <blockquote
      data-treecounterId="${this.props.currentUserProfile.treecounter.slug}"
      pftp
      data-widget-type="${this.state.activeWidget.type}"
      data-show-graphics="true"
      data-show-donate-button="true"
      data-background-color="#FFF"
      cite="${this.props.serverName}" >
        ${this.state.activeWidget.type}${i18n.t('label.widget_loading')}
    </blockquote>
    <script
      type="text/javascript"
      src="${this.props.serverName}/${this.state.activeWidget.script}">
    </script>

    `;
    const iframeContent = `${widgetCode}<style>.widget-container{height:100%, width:100%} body{height:100vh; font-family: "Open Sans", -apple-system, system-ui, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}} html{height:100vh}</style>`;
    return (
      <div className="app-container__content--center sidenav-wrapper pftp-widgets-share-container">
        <TextHeading>
          {i18n.t('label.widget_share')}
          <DescriptionHeading>
            {i18n.t('label.widget_share_description')}
          </DescriptionHeading>
        </TextHeading>
        {!this.props.currentUserProfile.mayPublish ? (
          <CardLayout className={'pftp-widget-card'}>
            <div className={'pftp-widgets-warning'}>
              {i18n.t('label.widget_not_public_acct_warning')}
            </div>
          </CardLayout>
        ) : (
          <React.Fragment>
            <CardLayout className={'pftp-widget-card'}>
              <h6> {i18n.t('label.widget_share_choose_widget')}</h6>
              <div className={'pftp-widgets'}>
                <div className="pftp-widgets__type">
                  {widgetList.map(widget => {
                    if (
                      widget.tpo &&
                      this.props.currentUserProfile.type != 'tpo'
                    ) {
                      return null;
                    }
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
                <pre>
                  <code>{widgetCode}</code>
                </pre>
              </div>
            </CardLayout>
            <CardLayout className={'pftp-preview-widget-card '}>
              <h6>{i18n.t('label.widget_preview')}</h6>
              <iframe
                width="200"
                height="480"
                id="pftp-widgets-preview"
                ref="iframe"
                srcDoc={iframeContent}
              />
            </CardLayout>
          </React.Fragment>
        )}
      </div>
    );
  }
}

WidgetShare.propTypes = {
  currentUserProfile: PropTypes.object,
  serverName: PropTypes.string
};
