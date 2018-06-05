import React from 'react';
import EditUserProfile from '../../components/EditUserProfile';
import { currentUserProfileSelector } from '../../selectors/index';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateUserProfile } from '../../actions/updateUserProfile';

class EditUserProfileContainer extends React.Component {
  onSave = type => {
    console.log(type, this.refs);
    let value = this.refs.EditUserProfileContainer.refs[type].getValue();
    if (value) {
      updateUserProfile(type, value);
    }
  };
  render() {
    console.log('___render___Edit_userprofile_container');
    return (
      <EditUserProfile
        ref={'EditUserProfileContainer'}
        currentUserProfile={this.props.currentUserProfile}
        onSave={this.onSave}
      />
    );
  }
}

EditUserProfileContainer.propTypes = {
  currentUserProfile: PropTypes.object
};

const mapStateToProps = state => ({
  currentUserProfile: currentUserProfileSelector(state)
});

export default connect(mapStateToProps)(EditUserProfileContainer);
