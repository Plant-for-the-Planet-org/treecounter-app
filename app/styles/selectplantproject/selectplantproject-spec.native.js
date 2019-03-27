import EStyleSheet from 'react-native-extended-stylesheet';

export default (selectplantprojectSpecs = EStyleSheet.create({
  project_specs__container: {
    width: '100%',
    height: '100%'
  },
  project_info: {
    width: '100%',
    height: '80%',
    paddingTop: 10,
    paddingBottom: 10
  },
  project_specs__taxdeductible: {
    width: '100%',
    paddingTop: 10,
    flexDirection: 'row',
    paddingLeft: 22,
    height: '20%'
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
    width: '100%',
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
    height: 14,
    width: 14,
    marginRight: 4
  },
  spec_icon: {
    height: 14,
    width: 14
  }
}));
