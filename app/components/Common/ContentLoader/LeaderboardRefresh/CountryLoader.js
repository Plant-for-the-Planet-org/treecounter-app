import React from 'react';
import ContentLoader from 'react-content-loader'
import { Circle, Rect } from 'react-native-svg';

const CountryLoader = () => {
  return (
    <ContentLoader
      height={100}
      width={400}
      speed={2}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <Rect x="116" y="28" rx="4" ry="4" width="120" height="16" />
      <Circle cx="74" cy="46" r="30" />
      <Rect x="117" y="50" rx="4" ry="4" width="200" height="16" />
      <Rect x="11" y="41" rx="4" ry="4" width="25" height="16" />
    </ContentLoader>
  );
};
export default CountryLoader;
