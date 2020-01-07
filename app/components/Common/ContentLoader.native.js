import React from 'react';
import { Image, View, Dimensions } from 'react-native';
import ContentLoader from 'react-native-content-loader';
import { Circle, Rect, Text } from 'react-native-svg';
import i18n from '../../locales/i18n.js';
import { loadingBar } from '../../assets';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const CompetitionLoader = () => (
  <ContentLoader
    height={550}
    width={500}
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <Rect x="100" y="3" rx="10" ry="10" width="300" height="180" />
    <Rect x="100" y="190" rx="10" ry="10" width="140" height="20" />
    <Rect x="100" y="215" rx="10" ry="10" width="300" height="20" />
    <Rect x="100" y="240" rx="10" ry="10" width="250" height="20" />
    <Rect x="100" y="270" rx="10" ry="10" width="300" height="180" />
    <Rect x="100" y="460" rx="10" ry="10" width="140" height="20" />
    <Rect x="100" y="490" rx="10" ry="10" width="300" height="20" />
    <Rect x="100" y="520" rx="10" ry="10" width="250" height="20" />
  </ContentLoader>
);
const SingleCompetitionLoader = () => (
  <ContentLoader
    height={550}
    width={500}
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <Rect x="100" y="3" rx="10" ry="10" width="300" height="180" />
    <Rect x="100" y="190" rx="10" ry="10" width="140" height="20" />
    <Rect x="100" y="217" rx="10" ry="10" width="300" height="20" />
    <Rect x="100" y="244" rx="10" ry="10" width="250" height="20" />
    <Rect x="100" y="274" rx="10" ry="10" width="140" height="20" />
    <Rect x="100" y="304" rx="10" ry="10" width="300" height="20" />
    <Rect x="100" y="334" rx="10" ry="10" width="250" height="20" />
  </ContentLoader>
);
const LeaderBoardLoader = () => (
  <ContentLoader height={300} duration={1000}>
    <Rect x="0" y="30" rx="0" ry="0" width="100" height="13" />
    <Rect x="0" y="55" rx="5" ry="5" width="200" height="26" />
    <Circle cx="250" cy="60" r="30" />
  </ContentLoader>
);
const WorldLoader = () => (
  <ContentLoader
    height={550}
    width={500}
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <Rect x="100" y="3" rx="10" ry="10" width="300" height="180" />
    <Rect x="100" y="190" rx="10" ry="10" width="140" height="20" />
    <Rect x="100" y="215" rx="10" ry="10" width="300" height="20" />
    <Rect x="100" y="240" rx="10" ry="10" width="250" height="20" />
    <Rect x="100" y="270" rx="10" ry="10" width="300" height="180" />
    <Rect x="100" y="460" rx="10" ry="10" width="140" height="20" />
    <Rect x="100" y="490" rx="10" ry="10" width="300" height="20" />
    <Rect x="100" y="520" rx="10" ry="10" width="250" height="20" />
  </ContentLoader>
);
const ProfileLoader = () => (
  <ContentLoader
    height={550}
    width={500}
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <Rect x="100" y="3" rx="10" ry="10" width="300" height="180" />
    <Rect x="100" y="190" rx="10" ry="10" width="140" height="20" />
    <Rect x="100" y="215" rx="10" ry="10" width="300" height="20" />
    <Rect x="100" y="240" rx="10" ry="10" width="250" height="20" />
    <Rect x="100" y="270" rx="10" ry="10" width="300" height="180" />
    <Rect x="100" y="460" rx="10" ry="10" width="140" height="20" />
    <Rect x="100" y="490" rx="10" ry="10" width="300" height="20" />
    <Rect x="100" y="520" rx="10" ry="10" width="250" height="20" />
  </ContentLoader>
);
const PublicProfileLoader = () => (
  <ContentLoader
    height={550}
    width={500}
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <Rect x="100" y="3" rx="10" ry="10" width="300" height="180" />
    <Rect x="100" y="190" rx="10" ry="10" width="140" height="20" />
    <Rect x="100" y="215" rx="10" ry="10" width="300" height="20" />
    <Rect x="100" y="240" rx="10" ry="10" width="250" height="20" />
    <Rect x="100" y="270" rx="10" ry="10" width="300" height="180" />
    <Rect x="100" y="460" rx="10" ry="10" width="140" height="20" />
    <Rect x="100" y="490" rx="10" ry="10" width="300" height="20" />
    <Rect x="100" y="520" rx="10" ry="10" width="250" height="20" />
  </ContentLoader>
);

const CompetitionListLoader = () => (
  <ContentLoader
    height={550}
    width={500}
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <Rect x="100" y="3" rx="10" ry="10" width="300" height="180" />
    <Rect x="100" y="190" rx="10" ry="10" width="140" height="20" />
    <Rect x="100" y="215" rx="10" ry="10" width="300" height="20" />
    <Rect x="100" y="240" rx="10" ry="10" width="250" height="20" />
    <Rect x="100" y="270" rx="10" ry="10" width="300" height="180" />
    <Rect x="100" y="460" rx="10" ry="10" width="140" height="20" />
    <Rect x="100" y="490" rx="10" ry="10" width="300" height="20" />
    <Rect x="100" y="520" rx="10" ry="10" width="250" height="20" />
  </ContentLoader>
);

const CompetitionSingleLoader = () => (
  <ContentLoader
    height={550}
    width={500}
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <Rect x="100" y="3" rx="10" ry="10" width="300" height="180" />
    <Rect x="100" y="190" rx="10" ry="10" width="140" height="20" />
    <Rect x="100" y="215" rx="10" ry="10" width="300" height="20" />
    <Rect x="100" y="240" rx="10" ry="10" width="250" height="20" />
    <Rect x="100" y="270" rx="10" ry="10" width="300" height="180" />
    <Rect x="100" y="460" rx="10" ry="10" width="140" height="20" />
    <Rect x="100" y="490" rx="10" ry="10" width="300" height="20" />
    <Rect x="100" y="520" rx="10" ry="10" width="250" height="20" />
  </ContentLoader>
);

const ProjectListLoader = () => (
  <ContentLoader
    height={550}
    width={500}
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <Rect x="100" y="3" rx="10" ry="10" width="300" height="180" />
    <Rect x="100" y="190" rx="10" ry="10" width="140" height="20" />
    <Rect x="100" y="215" rx="10" ry="10" width="300" height="20" />
    <Rect x="100" y="240" rx="10" ry="10" width="250" height="20" />
    <Rect x="100" y="270" rx="10" ry="10" width="300" height="180" />
    <Rect x="100" y="460" rx="10" ry="10" width="140" height="20" />
    <Rect x="100" y="490" rx="10" ry="10" width="300" height="20" />
    <Rect x="100" y="520" rx="10" ry="10" width="250" height="20" />
  </ContentLoader>
);

const ProjectSingleLoader = () => (
  <ContentLoader
    height={550}
    width={500}
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <Rect x="100" y="3" rx="10" ry="10" width="300" height="180" />
    <Rect x="100" y="190" rx="10" ry="10" width="140" height="20" />
    <Rect x="100" y="215" rx="10" ry="10" width="300" height="20" />
    <Rect x="100" y="240" rx="10" ry="10" width="250" height="20" />
    <Rect x="100" y="270" rx="10" ry="10" width="300" height="180" />
    <Rect x="100" y="460" rx="10" ry="10" width="140" height="20" />
    <Rect x="100" y="490" rx="10" ry="10" width="300" height="20" />
    <Rect x="100" y="520" rx="10" ry="10" width="250" height="20" />
  </ContentLoader>
);

const DefaultLoader = () => (
  <View style={[loadingIndicatorStyle, containerStyle]}>
    <Image source={loadingBar} alt={i18n.t('label.loading')} />
  </View>
);

const PublicTreeCounterContentLoader = () => (
  <ContentLoader
    height={HEIGHT}
    width={WIDTH}
    speed={3}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    <Circle cx="50" cy="60" r="30" />
    <Rect x="100" y="40" rx="4" ry="4" width="220" height="13" />
    <Rect x="100" y="70" rx="4" ry="4" width="100" height="13" />
    <Circle cx="160" cy="270" r="106" />
  </ContentLoader>
);

const ContentLoading = props => {
  const { screen } = props;
  return (
    <View style={loadingIndicatorStyle}>
      {screen === 'AppHome' && <WorldLoader />}
      {screen === 'LeaderBoard' && <LeaderBoardLoader />}
      {screen === 'Competition' && <CompetitionLoader />}
      {screen === 'SingleCompetition' && <SingleCompetitionLoader />}
      {screen === 'PublicTreeCounterContentLoader' && (
        <PublicTreeCounterContentLoader />
      )}
      {screen === 'profileLoader' && <ProfileLoader />}
      {screen === 'publicProfileLoader' && <PublicProfileLoader />}
      {screen === 'competitionListLoader' && <CompetitionListLoader />}
      {screen === 'competitionSingleLoader' && <CompetitionSingleLoader />}
      {screen === 'projectListLoader' && <ProjectListLoader />}
      {screen === 'worldLoader' && <WorldLoader />}
      {screen === 'projectSingleLoader' && <ProjectSingleLoader />}
    </View>
  );
};
const loadingIndicatorStyle = {
  flex: 1,
  alignItems: 'center',
  marginTop: '5%'
};
const containerStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
};
export default ContentLoading;

export { PublicTreeCounterContentLoader };
