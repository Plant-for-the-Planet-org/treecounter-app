import { Dimensions, Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const screen = Dimensions.get('window');
const { height: HEIGHT, } = screen;
const CARD_HEIGHT = 100;



export default EStyleSheet.create({
    bottomArrowsCont: {
        flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white',
        marginRight: 20
    },
    swiperCont: {
        width: '100%',
        height: 130,
        bottom: 0,
        backgroundColor: '#fff',
        position: 'absolute'
    },
    multipleTrees: {
        height: 40, width: 30,

    },
    treeImage: {
        height: 25, width: 20,
    },
    userContributionsDetailsFullViewCont: {
        backgroundColor: 'white',
        width: '100%',
        height: HEIGHT * 0.60,
        position: 'absolute',
        bottom: 0,
    },
    treeCount: {
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    map: {
        backgroundColor: 'transparent',
        flex: 1,
    },
    downArrowIcon: {
        position: 'absolute',
        top: Platform.OS == 'ios' ? 45 : 20,
        left: 30,
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 5
    },
    myLocationIcon: {
        position: 'absolute',
        bottom: 240,
        right: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 50,
        elevation: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullScreenExitIcon: {
        position: 'absolute',
        bottom: 170,
        right: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 50,
        elevation: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    satellite: {
        position: 'absolute',
        bottom: 310,
        right: 20,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 50,
        elevation: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        overflow: 'hidden',

        width: '100%'
    },
    textContent: {
        flex: 1
    }
})
