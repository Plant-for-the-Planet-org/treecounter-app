import React, { Component } from 'react';
import PlantedProgressBar from '../../../../../app/components/PlantProjects/PlantedProgressbar';
import SecondaryButton from '../../../../../app/components/Common/Button/SecondaryButton';
import { tree } from '../../../../../app/assets';
import PropTypes from 'prop-types';
// import ReactTooltipStyle from '../../../../../node_modules/react-tooltip/dist/style';
import i18n from '../../../../../app/locales/i18n.js';
import { getLocalRoute } from '../../../../../app/actions/apiRouting';

export default class App extends Component {
  constructor(props) {
    super(props);
    const treecounter = this.props.treecounter;
    this.state = {
      target: treecounter.countTarget,
      planted: treecounter.countPlanted
    };
  }
  componentWillReceiveProps(nextProps) {
    const treecounter = nextProps.treecounter;
    if (treecounter) {
      this.setState({
        target: treecounter.countTarget,
        planted: treecounter.countPlanted
      });
    }
  }

  render() {
    const { serverName, ProjectId } = this.props;
    const style = `.canvasContainer {
      background-color:${this.props.backgroundColor};
    }`;
    const inheritedStyleBody = ':host {all: initial;}';
    return (
      <React.Fragment>
        {/* Scoped CSS: CSS defined inside shadow DOM is scoped
        to it. Style rules don't leak out and page styles don't bleed in. */}
        {/* Simplifies CSS - Scoped DOM means you can use simple CSS selectors,
        more generic id/class names, and not worry about naming conflicts. */}
        {/* Reset inherited CSS  */}
        {/* why? */}

        {/*Inherited properties will be inherited as usual. It's better to think of the shadow
          boundary as affecting the cascade, namely the scope of selectors and the importance of rules. */}
        <style>{inheritedStyleBody}</style>
        <div>
          <link href="progressbarwidget.css" rel="stylesheet" />
          <link href={`${serverName}/progressbarwidget.css`} rel="stylesheet" />
          {/* Apply CSS hooks here */}
          <style>{style}</style>
          {/* Apply React Tooltip Library CSS */}
          {/* TODO: removed as not existing any more, replace with something else?
             <style>{ReactTooltipStyle}</style> */}
          <div className="widget-container" id={'widget-container'}>
            {this.props.showGraphics && (
              <div className={'pftp-widget-img__container'}>
                <img src={tree} className={'pftp-widget-img'} />
              </div>
            )}

            <PlantedProgressBar
              countPlanted={this.state.planted}
              countTarget={this.state.target}
            />
            {this.props.showDonateButton && (
              <div className={'pftp-widget-btn__container'}>
                <SecondaryButton
                  onClick={() => {
                    const url = `${serverName}${getLocalRoute(
                      'app_donateTrees'
                    )}${ProjectId ? '/' + ProjectId : ''}`;
                    window.open(url, '_blank');
                  }}
                >
                  {i18n.t('label.plant_trees')}
                </SecondaryButton>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  showGraphics: PropTypes.bool,
  treecounter: PropTypes.object,
  showDonateButton: PropTypes.bool,
  serverName: PropTypes.string,
  baseUrl: PropTypes.string,
  backgroundColor: PropTypes.string,
  ProjectId: PropTypes.any
};
