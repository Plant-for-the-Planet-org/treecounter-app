import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native';

export default (plantProjectDetail = EStyleSheet.create({
  carousalContainer: { flexDirection: 'column' },
  descriptionContainer: {
    paddingTop: 20,
    paddingLeft: 5
  },
  descriptionText: {
    color: '#686060'
  },
  linkTextContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5
  },
  linkIcon: {
    width: 15,
    height: 15,
    marginRight: 5
  },
  linkText: { alignSelf: 'flex-end', color: '$colorPrimaryAccent' },
  videoContainer: { paddingTop: 20 }
}));
