import React, { Component } from 'react';
import { connect } from 'react-redux';

import PublicTreecounter from '../../components/PublicTreeCounter/PublicTreecounter';
// import TPOComponent from '../TpoProjects/TPOComponent';
import { treecounterLookupAction } from '../../actions/treecounterLookupAction';
// import SvgContainer from '../Common/SvgContainer';
// import TreecounterGraphicsText from '../TreecounterGraphics/TreecounterGraphicsText';
// import SupportButton from './SupportButton';

class PublicTreecounterContainer extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      treecounter: null,
      displayName: '',
      isTpo: false
    };
  }

  fetchAndSetSearchResult(props) {
    const {
      dispatch,
      match: { params }
    } = props;

    dispatch(treecounterLookupAction(params.treecounterId))
      .then(treecounter => {
        this.setState({
          treecounter,
          isTpo: treecounter.userProfile && treecounter.userProfile === 'tpo',
          id: treecounter.id
        });
      })
      .catch(error => console.log(error));
  }
  componentWillMount() {
    this.fetchAndSetSearchResult(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (
      this.props.match.params.treecounterId ===
      nextProps.match.params.treecounterId
    )
      return;
    this.fetchAndSetSearchResult(nextProps);
  }

  render() {
    return <PublicTreecounter treecounter={this.state.treecounter} />;
  }
}

const mapStateToProps = function(state) {
  return {
    userTpos: state.entities.tpo
  };
};

export default connect(mapStateToProps)(PublicTreecounterContainer);

import PropTypes from 'prop-types';
PublicTreecounterContainer.propTypes = {
  userTpos: PropTypes.object.isRequired,
  treecounterData: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      treecounterId: PropTypes.string
    })
  }).isRequired
};
