//#region import 
//#region RN
import React, { useContext } from 'react';
import { Image, TouchableOpacity } from 'react-native';
//#endregion
//#region third party libs
import { useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
//#endregion
//#region common files
import { colors as localColors } from '../../res/colors';
import globalStyles, { GlobalFlex, GlobalSubHeader, Label, SubContainer, TitleText } from '../../res/globalStyles';
import { Spacer } from '../../res/spacer';
import { DEVICE_OS, wp } from '../../utils/constants';
import { images } from '../../res/images';
import style from './styles';
import { SettingsContext } from '../../context/SettingContext';
//#endregion
//#region redux
// import OnBackPressed from '../../components/OnBackPressed';
//#endregion
//#endregion

export default Settings = (props) => {
    const { colors } = useTheme();
    const { t } = useTranslation();
    //#region Context variable
    const { state: ContextState, actionLanguageSelection } = useContext(SettingsContext);
    const { globalLanguageOptions } = ContextState;
    //#endregion

    return (
        <GlobalFlex style={{ backgroundColor: colors.background }}>
            <Spacer space={DEVICE_OS === 'ios' ? wp(3) : wp(1)} />
            <GlobalSubHeader style={style.subHeader}>
                <Label style={{ color: colors.text, fontSize: wp(6.5) }}>{t('select language')}</Label>
                <Image source={images.ic_lang} style={{ ...globalStyles.img, ...style.languageImg }} />
            </GlobalSubHeader>
            <Spacer space={wp(1)} />
            <SubContainer style={style.subContainer}>
                {globalLanguageOptions.map((item, index) => {
                    return (
                        <>
                            <Spacer space={wp(2.5)} />
                            <TouchableOpacity onPress={() => actionLanguageSelection(item)}>
                                <TitleText style={{ color: item.isSelected ? localColors.blue : colors.text, fontSize: wp(5) }}>{item.title}</TitleText>
                            </TouchableOpacity>
                        </>
                    )
                })}
            </SubContainer>
        </GlobalFlex>
    );
}