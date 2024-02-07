import { Dimensions } from 'react-native';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
export default {
    window: {
        width: width,
        height: height,
    },
    isSmallDevice: width < 375,
};
