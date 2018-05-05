import React, { Component } from 'react';
import { connect } from 'react-redux';
import TPOComponent from '../TpoProjects/TPOComponent';
import { treecounterLookupAction } from '../../actions/treecounterLookupAction';
import SvgContainer from '../Common/SvgContainer';
import TreecounterGraphicsText from './TreecounterGraphicsText';

class SearchUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      svgData: {},
      displayName: '',
      isTpo: false
    };
  }

  fetchAndSetSearchResult(props) {
    const {
      dispatch,
      match: { params }
    } = props;
    let tpoState = false;
    // Check if its a TPO
    for (let key in this.props.userTpos) {
      if (key === params.userId) {
        tpoState = true;
        break;
      }
    }
    // Call Search API

    dispatch(treecounterLookupAction(params.treecounterId))
      .then(treecounter => {
        console.log(treecounter);
        const { userProfile } = treecounter.userProfile;
        this.setState({
          svgData: {
            id: treecounter.id,
            target: treecounter.count_target,
            planted: treecounter.count_planted,
            community: treecounter.count_community,
            personal: treecounter.count_personal
          },
          displayName: treecounterId.display_name,
          isTpo: 'tpo' === userProfile.type,
          id: treecounter.id
        });
      })
      .catch(error => console.log(error));
  }
  componentWillMount() {
    console.log('Search ----- Component will mount', this.props);
    this.fetchAndSetSearchResult(this.props);
  }
  componentWillReceiveProps(nextProps) {
    console.log(
      'Search ----- Component will recieve props',
      nextProps,
      this.props
    );
    if (this.props.match.params.userId === nextProps.match.params.userId)
      return;
    this.fetchAndSetSearchResult(nextProps);
  }
  render() {
    return (
      <div className="canvasContainer flex-column search-container">
        {this.state.ifTpo ? (
          <div className="search-container__header">
            <i className="material-icons">language</i>
            <div>
              <span>Tree-Planting Organization</span>
              <h4>{this.state.displayName}</h4>
            </div>
          </div>
        ) : (
          <div className="search-container__header sidenav-wrapper">
            <i className="material-icons">account_circle</i>
            <div>
              <span>Individual</span>
              <h4>{this.state.displayName}</h4>
            </div>
          </div>
        )}
        <div className="search-container__content sidenav-wrapper">
          <div className="canvasContainer flex-column">
            <SvgContainer {...this.state.svgData} />
            {this.props.treecounterData === null ? (
              <LoadingIndicator />
            ) : (
              <TreecounterGraphicsText treecounterData={this.state.svgData} />
            )}
          </div>
          {this.state.ifTpo ? <TPOComponent id={this.state.id} /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  console.log('Store updated - Search', state);
  return {
    userTpos: state.entities.tpo
  };
};

export default connect(mapStateToProps)(SearchUser);
