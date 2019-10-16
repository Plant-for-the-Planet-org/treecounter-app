import React from 'react';
import WidgetShare from '../../components/WidgetsShare';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { currentUserProfileSelector } from '../../selectors';
import { context } from '../../config';

const { scheme, host } = context;
const serverName = `${scheme}://${host}`;

class WidgetShareContainer extends React.PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {}

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
  console.log(state);
  return {
    currentUserProfile: currentUserProfileSelector(state)
  };
};

export default connect(mapStateToProps, null)(WidgetShareContainer);

WidgetShareContainer.propTypes = { currentUserProfile: PropTypes.object };
