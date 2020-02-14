import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../Header/BackHeader';

const RegisterTreeForm = () => {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeaderText}>{`Register Trees`}</Text>
        <Text style={styles.subHeadingText}>{`Please Review details`}</Text>
      </View>
      <View style={{ marginHorizontal: 15 }}>
        <View style={styles.subContainer}>
          <Text style={styles.label}>{`On Site Registration`}</Text>
          <Text style={styles.labelAction}>{`Edit`}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.label}>{`Project`}</Text>
          <Text style={styles.labelAction}>{`Yuctan Reforestation`}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.label}>{`Type`}</Text>
          <Text style={styles.labelAction}>{`External/Donated Trees`}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.label}>{`Species`}</Text>
          <Text style={styles.labelAction}>{`Edit`}</Text>
        </View>
        <View style={styles.speciesSubContainer}>
          <Text style={[styles.subHeadingText]}>{`Apples`}</Text>
          <Text style={[styles.labelAction, styles.textBlack]}>
            <Text style={styles.numberOfTrees}>50</Text> Trees
          </Text>
        </View>
        <View style={styles.speciesSubContainer}>
          <Text style={[styles.subHeadingText]}>{`Oranges`}</Text>
          <Text style={[styles.labelAction, styles.textBlack]}>
            <Text style={styles.numberOfTrees}>50</Text> Trees
          </Text>
        </View>
        <View style={styles.subContainer}>
          <Text style={styles.label}>{`Polygon A`}</Text>
          <Text style={styles.labelAction}>{`Edit`}</Text>
        </View>
        {[1, 1].map(x => (
          <View style={styles.polygonSubContainer}>
            <View style={styles.coordinatesCont}>
              <Text style={styles.coordinates}>Coordinates A</Text>
              <Text style={styles.coordinatesContAction}>Edit</Text>
            </View>
            <Text style={styles.coordinatesNumber}>84.31356,21.3456</Text>
            <Text style={[styles.coordinatesNumber, styles.textGreen]}>
              Add Images
            </Text>
          </View>
        ))}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 5,
            borderColor: '#c4c0c0',
            borderWidth: 1,
            paddingHorizontal: 15,
            marginTop: 20
          }}
        >
          <Text style={styles.label}>{`On Site Registration`}</Text>
        </View>
      </View>
      <View style={{ marginVertical: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textGreen: {
    color: '#78B806'
  },
  subHeadingText: {
    fontSize: 18,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 24,
    color: '#4d5153',
    marginVertical: 15
  },
  coordinates: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 17
  },
  coordinatesContAction: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    color: '#78B806'
  },
  label: {
    fontSize: 18,
    fontFamily: 'OpenSans-SemiBold',
    lineHeight: 24,
    color: '#4d5153',
    marginVertical: 15
  },
  numberOfTrees: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#78B806',
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#78B806'
  },
  polygonSubContainer: {
    borderRadius: 5,
    borderColor: '#c4c0c0',
    borderWidth: 1,
    padding: 15,
    marginLeft: 20,
    marginVertical: 8
  },
  coordinatesCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  coordinatesNumber: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 14,
    paddingVertical: 5
  },
  speciesSubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20
  },
  labelAction: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#78B806',
    marginVertical: 15
  },
  textBlack: { color: '#989A9C' },
  subHeaderContainer: {
    marginHorizontal: 15
  },
  subHeaderText: {
    fontSize: 27,
    fontFamily: 'OpenSans-Bold',
    lineHeight: 40,
    color: '#4d5153'
  }
});

export default RegisterTreeForm;
