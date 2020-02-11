import React from 'react';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import Pdf from 'react-native-pdf';
import { debug } from '../../debug';
import { getPDFUrl } from '../../actions/apiRouting';
import i18n from '../../locales/i18n.js';

export default class PDFViewer extends React.Component {
  constructor(props) {
    super(props);
    let { params } = this.props.navigation.state;
    this.state = { uri: params ? params.url : this.props.url, cache: true };
    debug();
  }

  render() {
    const source = { ...this.state, uri: getPDFUrl(this.state.uri) };
    let instance = this;
    debug(this.state);
    return (
      <View style={styles.container}>
        {!this.state.uri ? (
          <Text>{i18n.t('label.no_pdf_found')}</Text>
        ) : (
          <Pdf
            enablePaging
            source={source}
            onLoadComplete={numberOfPages => {
              debug(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={page => {
              debug(`current page: ${page}`);
            }}
            onError={() => {
              instance.setState({ uri: '' });
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
