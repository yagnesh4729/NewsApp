
import { StyleSheet } from 'react-native';
import { wp } from '../../utils/constants';

export const styles = StyleSheet.create({
    backIcon: {
        width: wp(5),
        height: wp(5),
        alignSelf: 'center',
    },
    text_center: {
        zIndex: -1,
        alignSelf: "center",
        fontSize: wp(4),
        position: "absolute",
        width: wp(95),
        textAlign: 'center'
    }
})