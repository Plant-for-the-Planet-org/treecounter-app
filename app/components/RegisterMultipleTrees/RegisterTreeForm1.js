import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Header from '../Header/BackHeader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PrimaryButton from '../Common/Button/PrimaryButton';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegisterTreeForm1 = () => {
  const [species, setSpecies] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [plantingDate, setPlantingDate] = useState('');

  let showDatePickerToggle = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  let onPressAddSpecies = () => {
    setSpecies([...species, { nameOfTree: '', treeCount: 0 }]);
  };

  let onChangeNameOfTree = (value, index) => {
    console.log(value, index, 'value, indexvalue, index');
    let specie = species[index];
    specie.nameOfTree = value;
    species.splice(index, 1, specie);
    setSpecies([...species]);
  };

  let onChangeTextTreeCount = (value, index) => {
    let specie = species[index];
    specie.treeCount = value;
    species.splice(index, 1, specie);
    setSpecies([...species]);
  };

  let handleConfirmDataTimePikker = (e, date) => {
    setPlantingDate(date);
    setDatePickerVisibility(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.subHeaderContainer}>
        <Text style={styles.subHeaderText}>{`Register Trees`}</Text>
        <Text
          style={styles.subHeadingText}
        >{`Please enter the total number of trees and species.`}</Text>
      </View>
      <View style={{ marginHorizontal: 15 }}>
        <TouchableOpacity
          onPress={showDatePickerToggle}
          style={{
            borderBottomWidth: 2,
            borderColor: '#7E8284',
            marginVertical: 15
          }}
        >
          <Text style={{ color: '#4d5153', fontFamily: 'OpenSans-Regular' }}>
            Plantation Date
          </Text>
          <View style={{ marginVertical: 5 }}>
            <Text
              style={{
                color: '#4d5153',
                fontSize: 18,
                fontFamily: 'OpenSans-Regular'
              }}
            >
              {plantingDate
                ? new Date(plantingDate).toDateString()
                : 'Select Planting Date'}
            </Text>
          </View>
        </TouchableOpacity>
        {isDatePickerVisible ? (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={new Date()}
            mode={'date'}
            is24Hour={true}
            display="default"
            onChange={handleConfirmDataTimePikker}
          />
        ) : null}
        {species.length > 0
          ? species.map((specie, i) => (
              <SpeciesForm
                onChangeTextTreeCount={onChangeTextTreeCount}
                onChangeNameOfTree={onChangeNameOfTree}
                key={i}
                index={i}
                specie={specie}
              />
            ))
          : null}
        <View>
          <Text
            onPress={onPressAddSpecies}
            style={{ color: '#FF8378', fontSize: 16, marginVertical: 15 }}
          >
            + Add Species
          </Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <PrimaryButton onClick={() => {}} buttonStyle={styles.buttonStyle}>
            <Text style={styles.continueBtn}>{'Continue Location'}</Text>
          </PrimaryButton>
        </View>
      </View>
    </ScrollView>
  );
};

const SpeciesForm = ({
  specie,
  onChangeNameOfTree,
  index,
  onChangeTextTreeCount
}) => {
  const [isDisplayFull, setIsDisplayFull] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsDisplayFull(!isDisplayFull)}
        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'OpenSans-SemiBold',
            lineHeight: 24,
            color: '#4d5153',
            marginVertical: 15
          }}
        >
          {specie.nameOfTree || 'Specie 1'}
        </Text>
        <Text style={[styles.labelAction, styles.textBlack]}>
          <Text style={styles.numberOfTrees}>{specie.treeCount || 0}</Text>{' '}
          Trees{' '}
          <Icon
            name={isDisplayFull ? 'chevron-up' : 'chevron-down'}
            size={25}
            color={'#53585A'}
          />
        </Text>
      </TouchableOpacity>

      {isDisplayFull ? (
        <>
          <View
            style={{
              borderBottomWidth: 2,
              borderColor: '#7E8284',
              marginVertical: 15
            }}
          >
            <Text style={{ color: '#4d5153', fontFamily: 'OpenSans-Regular' }}>
              Name of Trees
            </Text>
            <View style={{ marginVertical: 5 }}>
              <TextInput
                onChangeText={value => onChangeNameOfTree(value, index)}
                value={specie.nameOfTree}
                style={{
                  color: '#4d5153',
                  fontSize: 18,
                  fontFamily: 'OpenSans-Regular'
                }}
              />
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 2,
              borderColor: '#7E8284',
              marginVertical: 15
            }}
          >
            <Text style={{ color: '#4d5153', fontFamily: 'OpenSans-Regular' }}>
              Tree Count
            </Text>
            <View style={{ marginVertical: 5 }}>
              <TextInput
                keyboardType={'number-pad'}
                onChangeText={value => onChangeTextTreeCount(value, index)}
                value={specie.treeCount}
                style={{
                  color: '#4d5153',
                  fontSize: 18,
                  fontFamily: 'OpenSans-Regular'
                }}
              />
            </View>
          </View>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  exportGeojson: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    borderColor: '#c4c0c0',
    borderWidth: 1,
    paddingHorizontal: 15,
    marginTop: 20
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
  },
  buttonStyle: {
    width: 240,
    height: 52,
    borderRadius: 100,
    backgroundColor: '#89b53a'
  },
  continueBtn: {
    width: 72,
    height: 22,
    fontFamily: 'OpenSans-Bold',
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.21,
    textAlign: 'center',
    color: '#ffffff'
  }
});

export default RegisterTreeForm1;
