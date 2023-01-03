import { StyleSheet } from 'react-native';
import { DEVICE_OS, iPhoneXConfig, wp } from '../../utils/constants';

export default StyleSheet.create({
    subHeader: {
        justifyContent: 'space-between',
        width: wp(90),
        paddingTop: DEVICE_OS === 'ios'
            ? iPhoneXConfig.isIphoneX
                ? iPhoneXConfig.getStatusBarHeight()
                : 10
            : 16
    },
    subContainer: {
        width: wp(90)
    },
    languageImg: {
        marginTop: wp(0.5),
        marginRight: wp(1)
    }
});
