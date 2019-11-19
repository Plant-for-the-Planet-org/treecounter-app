import React, { lazy } from 'react';

const AboutUs = lazy(() => import('../../components/AboutUs'));

class AboutUsContainer extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <AboutUs />;
  }
}

export default AboutUsContainer;
