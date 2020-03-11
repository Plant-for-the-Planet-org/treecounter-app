import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { debug } from '../../debug';
import WidgetShare from '../../components/WidgetsShare';
import { currentUserProfileSelector } from '../../selectors';
import { context } from '../../config';

const { scheme, host } = context;
const serverName = `${scheme}://${host}`;

class WidgetShareContainer extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  UNSAFE_componentWillMount() {}

  render() {
    return (
      <WidgetShare
        currentUserProfile={this.props.currentUserProfile}
        serverName={serverName}
      />
    );
  }
}

const mapStateToProps = state => {
  debug(state);
  return {
    currentUserProfile: currentUserProfileSelector(state)
  };
};

export default connect(mapStateToProps, null)(WidgetShareContainer);

WidgetShareContainer.propTypes = { currentUserProfile: PropTypes.object };
