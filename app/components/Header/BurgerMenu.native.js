import React, { PureComponent } from 'react';
import TouchableItem from '../../components/Common/TouchableItem';
import { Image } from 'react-native';
import { getImageUrl } from '../../actions/apiRouting';
import { ProfilePic } from '../../assets';
import styles from '../../styles/menu';
import { currentUserProfileSelector } from '../../selectors';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class BurgerMenu extends PureComponent {
  render() {
    const { userProfile, navigation } = this.props;
    return (
      <TouchableItem
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Image
          style={styles.burgerMenuImageStyle}
          source={
            userProfile && userProfile.image
              ? {
                  uri: getImageUrl('profile', 'thumb', userProfile.image)
                }
              : ProfilePic
          }
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
