import EStyleSheet from 'react-native-extended-stylesheet';

const getHeaderText = function (padding, margin) {
  return {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'left',
    marginLeft: margin,
    color: '$colorPrimaryAccent',
    paddingRight: padding,
    flex: 1
  };
};

export const myTreesStyle = (color, borderColor) =>
  EStyleSheet.create({
    $color: color,
    $borderColor: borderColor,
    contentContainer: {
      flex: 1,
      paddingVertical: 20
    },
    multipleTrees : {
      marginLeft : 2, height: 20, width : 30, 
    }, 
    treeImage :{
      height: 25
    },
    contributionContainer: {
      borderWidth: 1,
      borderLeftWidth: 4,
      borderColor: '#e6e6e6',
      // borderLeftColor:
      //   contribution.contributionType == 'donation'
      //     ? '#95c243'
      //     : contribution.treeCount > 1
      //       ? '#68aeec'
      //       : '#ec6453',
      justifyContent: 'space-between',
      marginBottom: 10,
      margin: 10
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      flex: 1,
      flexGrow: 1
    },
    cardSubContainer: {
      padding: 5,
      marginBottom: 8
    },
    headContainer: {
      padding: 30
    },
    header: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      marginTop: 8,
      justifyContent: 'flex-start'
    },
    dateStyle: {
      color: '#aba2a2',
      fontSize: 16,
      textAlign: 'left'
    },
    headerText: getHeaderText(12, 8),
    pictureText: getHeaderText(0, 0),
    content: {
      marginTop: 8,
      padding: 0,
      flex: 1,
      backgroundColor: '#fff'
    },
    imageStyle: {
      width: 17,
      height: 18
    },
    seprator: {
      height: 2,
      backgroundColor: '#dadada'
    },
    actionBar: {
      flexDirection: 'row',
      height: 35,
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    actionButton: {
      borderWidth: 1,
      borderColor: '#e6e6e6',
      flexDirection: 'row',
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      height: '100%'
    },
    actionButtonText: {
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '500',
      color: '$colorPrimaryAccent'
    },
    addPadding: {
      padding: 10,
      paddingLeft: 20
    },
    minHeight: {
      minHeight: 80
    },
    updateTextStyle: {
      color: '$colorPrimaryAccent',
      position: 'absolute',
      right: 10,
      bottom: 10
    },
    deleteTextStyle: {
      color: '$colorPrimaryAccent',
      position: 'absolute',
      right: 10,
      bottom: 25
    },
    labelStyle: {
      position: 'absolute',
      right: 10,
      top: 10,
      backgroundColor: '$color',
      padding: 5
    },
    labelGreenColor: {
      backgroundColor: '#95c243'
    },
    labelGreyColor: {
      backgroundColor: '#e6e6e6'
    },
    boldText: {
      fontWeight: '600'
    },
    labelTextStyle: {
      color: 'white'
    },
    gap: {
      marginBottom: 5
    },
    restrictTextLength: {
      width: '80%'
    },
    leftBorder: {
      height: '100%',
      position: 'absolute',
      borderWidth: 2,
      left: 8,
      top: 10
    },
    leftColorBorder: {
      borderColor: '$borderColor'
    },

    // New Design

    singleRedeemObject: { backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#d5d5d5' },
    redeemObjectDate: {
      backgroundColor: '#f7f7f7',
      height: 40,
      justifyContent: 'center',
      zIndex: 2,
      paddingLeft: 20
    },
    redeemObjectDateText: {
      fontFamily: 'OpenSans-Regular',
      fontSize: 14,
      zIndex: 3
    },
    redeemObjectTreesContainer: { paddingHorizontal: 20, paddingVertical: 16 },
    row1: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    row2: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 6
    },
    redeemObjectTitle: {
      fontFamily: 'OpenSans-Bold',
      fontSize: 18,
      color: '#4d5153',
      maxWidth: '70%'
    },
    redeemObjectTrees: {
      fontFamily: 'OpenSans-Bold',
      fontSize: 18,
      color: '#89b53a'
    },
    redeemObjectSubTitle: { fontFamily: 'OpenSans-Regular', fontSize: 13 }
  });

const style = myTreesStyle('#95c243', '#68aeec');
export default style;
