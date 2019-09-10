import React, { PureComponent } from 'react';
import TouchableItem from '../../components/Common/TouchableItem';
import styles from '../../styles/menu.native';
import { currentUserProfileSelector } from '../../selectors';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserProfileImage from '../Common/UserProfileImage.native';

class BurgerMenu extends PureComponent {
  render() {
    const { userProfile, navigation } = this.props;
    return (
      <TouchableItem
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <UserProfileImage
          style={styles.burgerMenuImageStyle}
          profileImage={userProfile && userProfile.image}
          imageStyle={{ width: 32, height: 32, borderRadius: 32 / 2 }}
        />
      </TouchableItem>
    );
  }
}

const mapStateToProps = state => {
  return {
    userProfile: currentUserProfileSelector(state)
  };
};
export default connect(mapStateToProps, null)(BurgerMenu);

BurgerMenu.propTypes = {
  userProfile: PropTypes.any
};
