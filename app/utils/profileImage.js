import { getImageUrl } from '../actions/apiRouting';
import { ProfilePic } from '../assets';

/**
 * Get fully qualified url for profile image
 * from either userProfile or auth0user or the default Profile.
 *
 * The image may be from an identity provider (facebook, google, auth0, gravatar)
 * or hosted on TTC servers (legacy accounts)
 */
export const profileImageUrl = userProfile => {
  let img;

  // ttc userProfile
  if (userProfile && userProfile.image) {
    // URL may be external or on our servers.
    img = userProfile.image;
    if (!img.startsWith('http')) {
      img = getImageUrl('profile', 'thumb', img);
    }
  }

  if (img) {
    if (!img.startsWith('http')) {
      // TTC hosted profile image
      img = getImageUrl('profile', 'thumb', img);
    }
  }

  return img || ProfilePic;
};
