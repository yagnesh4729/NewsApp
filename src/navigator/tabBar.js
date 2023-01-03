//#region import 
//#region RN
import { useEffect, useContext } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
//#endregion
//#region third party libs
import { useTheme } from '@react-navigation/native';
//#endregion
//#region common files
import { images } from '../res/images';
import globalStyles from '../res/globalStyles';
import { colors as localColors } from '../res/colors';
import { iPhoneXConfig, wp } from '../utils/constants';
import { SettingsContext } from '../context/SettingContext';
//#endregion
//#endregion

export function TabBar({ state, descriptors, navigation }) {
    const { colors } = useTheme();
    //#region Context variable
    const { state: ContextState, actionGetCurrentLanguage } = useContext(SettingsContext);
    const { currentLangCode } = ContextState;
    //#endregion
    useEffect(() => {
        actionGetCurrentLanguage();
    }, []);
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;
                const icon =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name === 'News' ? (currentLangCode === 'ar' ? images.ic_news_ar : currentLangCode === 'fr' ? images.ic_news_fr : images.ic_news) : images.ic_settings;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <View style={{ flex: 1, alignItems: 'center', paddingBottom: iPhoneXConfig.isIphoneX() ? iPhoneXConfig.getBottomSpace() - wp(4) : 0, backgroundColor: colors.card }}>
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ alignItems: 'center', padding: wp(3) }}>
                            <Image source={icon} style={[{ ...globalStyles.img, marginBottom: wp(1) }, isFocused && { tintColor: localColors.blue }]} />
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
}