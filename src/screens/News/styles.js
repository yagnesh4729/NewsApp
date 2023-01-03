import { StyleSheet } from 'react-native';
import { colors } from '../../res/colors';
import { wp } from '../../utils/constants';

export default StyleSheet.create({
    cardImg: {
        width: wp(100),
        height: wp(55),
        resizeMode: 'cover'
    },
    cardTitleView: {
        width: wp(100),
        backgroundColor: colors.BLACK_TRANSPARENT,
        position: 'absolute',
        bottom: 0,
        padding: wp(3)
    },
    txtTitle: {
        lineHeight: wp(5)
    },
    txtNoImg: {
        width: wp(100),
        textAlign: 'center',
        position: 'absolute',
        top: wp(20)
    },
    txtLoadMore: {
        width: wp(100),
        textAlign: 'center',
        top: wp(5),
        marginBottom: wp(10)
    }   
});
