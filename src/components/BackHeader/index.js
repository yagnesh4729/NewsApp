import React from 'react';
import { TouchableOpacity, StatusBar, Image, View } from 'react-native';
import globalStyles, { GlobalHeader, GlobalSubHeader, Label } from '../../res/globalStyles';
import { styles } from './style';
import { images } from '../../res/images';
import { wp } from '../../utils/constants';
import { useTheme } from '@react-navigation/native';

export const BackHeader = props => {
  const { colors } = useTheme();
  const { showBack = true } = props;
  return (
    <>
      <StatusBar barStyle={'default'} />
      <GlobalHeader style={[!props.isShadow && globalStyles.shadow, { backgroundColor: colors.background }]}>
        <GlobalSubHeader>
          {showBack && (
            <TouchableOpacity style={{ position: 'absolute', alignSelf: 'center' }} onPress={() => props.onBackPress()}>
              {props.isLeftText ? (
                <View style={{ padding: wp(2), marginLeft: wp(4) }}>
                  <Label
                    style={[
                      styles.text_center,
                      { fontSize: wp(3.8), color: colors.text },
                    ]}>
                    {props?.backTitle || 'Cancel'}
                  </Label>
                </View>
              ) : (
                <Image
                  source={images.ic_back}
                  style={[
                    styles.backIcon,
                    { tintColor: props?.textColor?.color },
                  ]}
                />
              )}
            </TouchableOpacity>
          )}
          {props.isOnlyText && (
            <Label style={{ ...styles.text_center, color: colors.text }}>
              {props.title}
            </Label>
          )}
        </GlobalSubHeader>
      </GlobalHeader>
    </>
  );
};