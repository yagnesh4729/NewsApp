//#region import 
//#region RN
import React, { useContext } from 'react';
import { View, ScrollView, TouchableOpacity, Linking } from 'react-native';
//#endregion
//#region third party libs
import { useTheme } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
//#endregion
//#region common files
import { colors as localColors } from '../../res/colors';
import { GlobalFlex, GlobalSubHeader, Label, SubContainer, TitleText } from '../../res/globalStyles';
import { BackHeader } from '../../components/BackHeader';
import { NewsFeedContext } from '../../context/NewsFeedContext';
import { Spacer } from '../../res/spacer';
import { wp } from '../../utils/constants';
import style from './styles';
//#endregion
//#endregion

export default NewsDetails = (props) => {
    const { colors } = useTheme();
    const { t } = useTranslation();
    //#region Context variable
    const { state: ContextState } = useContext(NewsFeedContext);
    const { selectedFeedData } = ContextState;
    //#endregion
    return (
        <GlobalFlex style={{ backgroundColor: colors.background }}>
            <BackHeader
                showBack
                isOnlyText
                title={t('news details')}
                onBackPress={() => props.navigation.goBack()} />
            <Spacer space={wp(2)} />
            <ScrollView>
                <SubContainer>
                    <Label style={{ color: colors.text }}>{selectedFeedData.title}</Label>
                    <Spacer space={wp(2)} />
                    {selectedFeedData.author !== null && <GlobalSubHeader>
                        <Label style={{ color: colors.text }}>{t('author')}</Label>
                        <TitleText style={{ ...style.txtTitle, color: colors.text }}>{selectedFeedData.author}</TitleText>
                    </GlobalSubHeader>}
                    <Spacer space={wp(1)} />
                    <GlobalSubHeader>
                        <Label style={{ color: colors.text }}>{t('published')}</Label>
                        <TitleText style={{ ...style.txtTitle, color: colors.text }}>{selectedFeedData.publishedAt}</TitleText>
                    </GlobalSubHeader>
                    <Spacer space={wp(2)} />
                </SubContainer>
                <View>
                    <FastImage source={{ uri: selectedFeedData.urlToImage }} style={[style.cardImg, selectedFeedData.urlToImage === null && { backgroundColor: localColors.BLACK_TRANSPARENT_OPTION3 }]} />
                    {selectedFeedData.urlToImage === null && <Label style={{ ...style.txtNoImg, color: colors.text, top: wp(23) }}>{t('no image')}</Label>}
                </View>
                <Spacer space={wp(2)} />
                <SubContainer>
                    <TitleText style={{ ...style.txtTitle, color: colors.text }}>{selectedFeedData.description}</TitleText>
                    <Spacer space={wp(2)} />
                    <TitleText style={{ ...style.txtTitle, color: colors.text }}>{selectedFeedData.content}</TitleText>

                    <Spacer space={wp(5)} />
                    <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => Linking.openURL(selectedFeedData.url)}>
                        <Label style={{ color: localColors.blue }}>{t('click here')}</Label>
                    </TouchableOpacity>
                    <Spacer space={wp(5)} />
                </SubContainer>
            </ScrollView>

        </GlobalFlex>
    );
}