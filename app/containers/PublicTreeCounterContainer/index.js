import React, { Component } from 'react';
import { connect } from 'react-redux';

import updateRoute from '../../helpers/routerHelper';
import PublicTreecounter from '../../components/PublicTreeCounter/PublicTreecounter';
import { treecounterLookupAction } from '../../actions/treecounterLookupAction';

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

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      route: (routeName, id, params) => dispatch =>
        updateRoute(routeName, dispatch, id, params)
    },
    dispatch
  );
};

const mapStateToProps = function(state) {
  return {
    userTpos: state.entities.tpo
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  PublicTreecounterContainer
);

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
