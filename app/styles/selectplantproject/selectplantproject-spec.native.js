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
    paddingTop: 10,
    flexDirection: 'row',
    paddingLeft: 38
  },
  project_specs__taxdeductibleText: {
    fontSize: 13,
    color: '$textColor'
  },
  project_specs__taxdeductibleIcon: {
    width: 14,
    height: 14
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
    flex: 0.8,
    justifyContent: 'flex-end',
    alignContent: 'center'
  },
  project_specs__itemTextsurvival: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center'
  },
  project_specs__itemText_left: {
    color: '$textColor',
    textAlign: 'left'
  },
  project_specs__itemText_right: {
    color: '$textColor',
    textAlign: 'right'
  },

  spec_icon__container: {
    height: 15,
    width: 15,
    flex: 0.2,
    marginVertical: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  spec_icon: {
    height: 15,
    width: 15,
    alignSelf: 'center',
    justifyContent: 'center'
  }
}));
