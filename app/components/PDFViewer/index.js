import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { getPDFUrl } from '../../actions/apiRouting';
import Pdf from 'react-native-pdf';

export default class PDFViewer extends React.Component {
  constructor(props) {
    super(props);
    let { params } = this.props.navigation.state;
    this.state = { uri: params.url || this.props.url, cache: true };
  }

  render() {
    const source = { ...this.state, uri: getPDFUrl(this.state.uri) };
    let _instance = this;
    console.log(this.state);
    return (
      <View style={styles.container}>
        {!this.state.uri ? (
          <Text>No valid pdf found!</Text>
        ) : (
          <Pdf
            enablePaging
            source={source}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`current page: ${page}`);
            }}
            onError={error => {
              _instance.setState({ uri: '' });
              console.error(error);
            }}
            style={styles.pdf}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});
