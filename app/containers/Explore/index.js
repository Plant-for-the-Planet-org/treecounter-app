import React from 'react';

import Explore from '../../components/Explore';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import TextHeading from '../../components/Common/Heading/TextHeading';
import DescriptionHeading from '../../components/Common/Heading/DescriptionHeading';

class ExploreContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    this.setState({
      loading: false
    });
  }

  render() {
    return this.state.loading ? (
      <div className="app-container__content--center sidenav-wrapper">
        <LoadingIndicator />
      </div>
    ) : (
      <div className="app-container__content--center sidenav-wrapper">
        <TextHeading>
          Explore
          <DescriptionHeading>
            Lorem ipsum dolor sit amet, <a>www.trilliontreecampaign.org</a>{' '}
            sadipscing elitr, sed diam eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos eet justo
            duo dolores et ea rebum.
          </DescriptionHeading>
        </TextHeading>
        <Explore />
      </div>
    );
  }
}

export default ExploreContainer;
