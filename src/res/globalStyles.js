//#region import 
//#region RN
import { StyleSheet } from 'react-native';
//#endregion
//#region common files
import { colors } from './colors';
import { fonts } from './fonts';
import { hp, wp, DEVICE_OS, DEVICE, iPhoneXConfig } from '../utils/constants';
//#endregion
//#region third party libs
import { ifIphoneX } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
//#endregion
//#endregion

const SubContainer = styled.View`
  flex: 1;
  width: ${wp(95)};
  align-self: center;
`;

const GlobalFlex = styled.View`
  flex: 1;
  background-color: ${colors.WHITE};
`;

const GlobalHeader = styled.View`
  padding-bottom: ${DEVICE_OS === 'android' ? wp(7) : '20px'} ;
  padding-top: ${DEVICE_OS === 'ios'
    ? iPhoneXConfig.isIphoneX
      ? iPhoneXConfig.getStatusBarHeight() + wp(6)
      : 10
    : wp(7)};
  background-color: ${colors.WHITE};
`;

const GlobalSubHeader = styled.View`
  flex-direction: row;
  width: ${wp(95)};
  align-self: center;
  align-items: center;
`;

const GlobalBorder = styled.View`
  background-color: ${colors.grayLight};
  height: ${wp(0.15)};
  width: ${wp(100)};
`;

const TitleText = styled.Text`
  color: ${colors.WHITE};
  font-size: ${wp(4)}
`;

const Label = styled.Text`
  color: ${colors.WHITE};
  font-size: ${wp(4)};
  font-weight: bold;
`;



export {
  SubContainer,
  GlobalFlex,
  GlobalHeader,
  GlobalSubHeader,
  GlobalBorder,
  TitleText,
  Label
};

const globalStyles = StyleSheet.create({
  paddingTop: {
    ...ifIphoneX(
      {
        paddingTop: iPhoneXConfig.getStatusBarHeight() + hp(2.5)
      },
      {
        paddingTop: DEVICE_OS === 'ios' ? iPhoneXConfig.getStatusBarHeight() + hp(2.5) : hp(2.5)
      }
    )
  },
  img: {
    resizeMode: 'contain',
    height: wp(8),
    width: wp(8),
  },
  shadow: {
    backgroundColor: colors.WHITE,
    shadowColor: colors.BLACK2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6
  },
})

export default globalStyles;