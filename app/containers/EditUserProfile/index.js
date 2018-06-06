import React from 'react';
import EditUserProfile from '../../components/EditUserProfile';
import { currentUserProfileSelector } from '../../selectors/index';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateUserProfile } from '../../actions/updateUserProfile';
import { bindActionCreators } from 'redux';

class EditUserProfileContainer extends React.Component {
  onSave = (usertype, profileType) => {
    console.log(usertype, this.refs);
    console.log(
      this.refs.EditUserProfileContainer.refs[profileType].validate()
    );
    let value = this.refs.EditUserProfileContainer.refs[profileType].getValue();
    let imageValue = this.refs.EditUserProfileContainer.refs[
      'image'
    ].getValue();
    if (value) {
      this.props.updateUserProfile(value, profileType);
      console.log(profileType);
    }
    if (imageValue) {
      console.log(imageValue);
      this.props.updateUserProfile(imageValue, 'image');
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateUserProfile
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(
  EditUserProfileContainer
);

EditUserProfileContainer.propTypes = {
  updateUserProfile: PropTypes.func
};
