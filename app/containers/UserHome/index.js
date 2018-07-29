import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  userTreecounterDataSelector,
  currentUserProfileSelector
} from '../../selectors';
import UserHome from '../../components/UserHome';

class UserHomeContainer extends React.Component {
  render() {
    const { treecounterData, currentUserProfile } = this.props;

    return (
      <UserHome
        treecounterData={treecounterData}
        userProfile={currentUserProfile}
      />
    );
  }
}

const mapStateToProps = state => ({
  treecounterData: userTreecounterDataSelector(state),
  currentUserProfile: currentUserProfileSelector(state)
});

export default connect(mapStateToProps)(UserHomeContainer);

UserHomeContainer.propTypes = {
  treecounterData: PropTypes.object,
  currentUserProfile: PropTypes.object
};
