import EStyleSheet from 'react-native-extended-stylesheet';

export default (selectplantprojectSpecs = EStyleSheet.create({
  project_specs__container: {
    width: '100%',
    height: '100%',
    flex: 1
  },
  project_info: {
    width: '100%',
    paddingTop: 10
  },
  project_specs__taxdeductible: {
    width: '100%',
    paddingTop: 10
  },
  project_specs__taxdeductibleText: {
    width: '100%',
    fontSize: 13,
    color: 'grey'
  },
  project_specs__item: {
    width: 350,
    paddingTop: 5,
    paddingRight: 15,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  project_specs__itemText: {
    flex: 5,
    justifyContent: 'flex-end',
    alignContent: 'center'
  },
  spec_icon__container: {
    height: 15,
    width: 15,
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  spec_icon: {
    height: 15,
    width: 15,
    alignSelf: 'center'
  }
}));
