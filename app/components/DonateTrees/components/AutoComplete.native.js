import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { context } from './../../../config';

const { googleMapApiKey } = context;

export default GooglePlacesInput = props => {
  const [listViewDisplayed, setListViewDisplayed] = React.useState(true);
  return (
    <GooglePlacesAutocomplete
      placeholder={props.placeholder}
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed={listViewDisplayed} // true/false/undefined
      fetchDetails
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true

        console.log('Data', data)
        setListViewDisplayed(false);
        props.setFieldValue('address', data);
      }}
      getDefaultValue={() => props.initialValue}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: googleMapApiKey,
        language: 'en', // language of the results
        types: '(cities)' // default: 'geocode'
      }}
      styles={{
        textInputContainer: {
          width: '100%',
          backgroundColor: 'white',
          paddingLeft: 0,
          borderTopWidth: 0,
          borderBottomWidth: 1,
          marginTop: 20
        },
        textInput: {
          paddingLeft: 0,
          fontFamily: 'OpenSans-Regular',
          borderWidth: 0,
          marginLeft: 0,
          marginRight: 0
        },
        description: {
          fontFamily: 'OpenSans-Regular'
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}
      // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      // currentLocationLabel="Current location"
      nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={
        {
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }
      }
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        type: 'cafe'
      }}
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: 'formatted_address'
      }}
      filterReverseGeocodingByTypes={[
        'locality',
        'administrative_area_level_3'
      ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
    />
  );
};
