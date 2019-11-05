import React from 'react';
import { Image, View, Text } from 'react-native';
import ContentLoader from 'react-native-content-loader';
import { Circle, Rect } from 'react-native-svg';

const AppHomeLoader = () => (
  <ContentLoader height={740} duration={1000}>
    <Circle cx="59" cy="75" r="35" />
    <Rect x="110" y="45" rx="0" ry="0" width="160" height="15" />
    <Rect x="110" y="70" rx="0" ry="0" width="130" height="15" />
    <Rect x="110" y="95" rx="0" ry="0" width="130" height="15" />
    <Circle cx="185" cy="325" r="110" />
    <Rect x="24" y="525" rx="0" ry="0" width="320" height="13" />
    <Rect x="24" y="545" rx="0" ry="0" width="290" height="13" />
    <Rect x="24" y="565" rx="0" ry="0" width="320" height="13" />
  </ContentLoader>
);
const CompetitionLoader = () => (
  <ContentLoader height={740} duration={1000}>
    <Rect x="0" y="10" rx="0" ry="0" width="300" height="160" />
    <Rect x="0" y="190" rx="0" ry="0" width="80" height="10" />
    <Rect x="0" y="220" rx="0" ry="0" width="120" height="7" />
    <Rect x="0" y="250" rx="0" ry="0" width="120" height="10" />
    <Rect x="150" y="250" rx="0" ry="0" width="120" height="10" />
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
      {screen === 'Competition' && <CompetitionLoader />}
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
