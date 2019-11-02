import React from 'react';
import { Image, View, Text } from 'react-native';
import ContentLoader from 'react-native-content-loader';
import { Circle, Rect } from 'react-native-svg';

const AppHomeLoader = () => (
  <ContentLoader height={300} duration={1000}>
    <Rect x="0" y="0" rx="0" ry="0" width="100" height="13" />
    <Circle cx="30" cy="60" r="30" />
    <Rect x="75" y="40" rx="4" ry="4" width="100" height="13" />
    <Rect x="75" y="70" rx="4" ry="4" width="50" height="8" />
    <Rect x="0" y="100" rx="5" ry="5" width="400" height="200" />
  </ContentLoader>
);
const LeaderBoardLoader = () => (
  <ContentLoader height={300} duration={1000}>
    <Rect x="0" y="30" rx="0" ry="0" width="100" height="13" />
    <Rect x="0" y="55" rx="5" ry="5" width="200" height="26" />
    <Circle cx="250" cy="60" r="30" />
  </ContentLoader>
);

const ContentLoading = props => {
  const { screen } = props;
  return (
    <View style={[loadingIndicatorStyle]}>
      {screen === 'AppHome' && <AppHomeLoader />}
      {screen === 'LeaderBoard' && <LeaderBoardLoader />}
    </View>
  );
};
const loadingIndicatorStyle = {
  flex: 1,
  alignItems: 'center',
  flexDirection: 'column',
  marginTop: '5%'
};
export default ContentLoading;
