//#region import 
//#region RN
import React, { useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
//#endregion
//#region third party libs
import { useTheme } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import { useTranslation } from 'react-i18next';
//#endregion
//#region common files
import { colors as localColors } from '../../res/colors';
import globalStyles, { GlobalFlex, Label, TitleText } from '../../res/globalStyles';
import { BackHeader } from '../../components/BackHeader';
import { NewsFeedContext } from '../../context/NewsFeedContext';
import { Spacer } from '../../res/spacer';
import { iPhoneXConfig, wp } from '../../utils/constants';
import style from './styles';
import { SearchBar } from '../../components/SearchBar';
import { SettingsContext } from '../../context/SettingContext';
//#endregion
//#region redux
// import OnBackPressed from '../../components/OnBackPressed';
//#endregion
//#endregion

export default News = (props) => {
    const { dark, colors } = useTheme();
    const { t } = useTranslation();
    //#region Context variable
    const { state: ContextState, actionGetUserFeeds, actionSearchUserFeeds, onNewsItemClicked } = useContext(NewsFeedContext);
    const { globalFeedData, globalSearchFeedData, isRateLimited, isReached } = ContextState;
    const { state: ContextSettingState } = useContext(SettingsContext);
    const { currentLangCode } = ContextSettingState;
    //#endregion
    const [refreshing, setRefreshing] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [page, setPage] = useState(1);
    const [currentLang, setCurrentLange] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    useEffect(() => {
        if (currentLangCode !== '' || currentLangCode !== null || currentLangCode !== undefined) {
            setSearchInput('');
            actionGetUserFeeds(currentLangCode, currentLang !== currentLangCode ? 1 : page);
            setTimeout(() => {
                currentLang !== currentLangCode && setPage(1)
                setCurrentLange(currentLangCode);
            }, 500);
        }
    }, [currentLangCode]);

    useEffect(() => {
        globalFeedData?.length !== 0 && (setRefreshing(false), setLoading(false));
    }, [globalFeedData]);
    useEffect(() => {
        isReached && setIsLoadingMore(false);
    }, [isReached]);

    const renderFooter = () => {
        return (
            isLoadingMore &&
            <TouchableOpacity
                onPress={() => {
                    setLoading(true);
                    setPage(page + 1);
                    actionGetUserFeeds(currentLangCode, page + 1);
                }}>
                {loading ?
                    <ActivityIndicator color={colors.text} size='large' style={{ padding: wp(5) }} /> :
                    <Label style={{ ...style.txtLoadMore, color: colors.text }}>{t('loading more')}</Label>}
            </TouchableOpacity>
        );
    };
    return (
        <GlobalFlex style={{ backgroundColor: colors.background }}>
            <BackHeader
                showBack={false}
                isOnlyText
                isShadow
                title={t('newsfeed')} />

            <SearchBar
                value={searchInput}
                is_clickable={true}
                placeholder={t('search news')}
                placeholderTextColor={localColors.gray}
                style={{ padding: wp(1), paddingLeft: wp(3), width: wp(86) }}
                mainstyle={{ flexDirection: 'row', width: wp(95), backgroundColor: colors.background }}
                returnKeyType={'search'}
                onChange={(value) => {
                    setSearchInput(value);
                    actionSearchUserFeeds(value, currentLangCode);
                }} />
            <Spacer space={wp(1)} />
            <View style={{
                paddingBottom: iPhoneXConfig.isIphoneX
                    ? iPhoneXConfig.getStatusBarHeight() + wp(21) : 16
            }}>
                {isRateLimited ? <TitleText style={{ ...style.txtNoImg, color: colors.text, width: wp(90), alignSelf: 'center' }}>{t('rate limited')}</TitleText> :
                    <FlatList
                        data={searchInput === '' ? globalFeedData : globalSearchFeedData}
                        keyExtractor={(item, index) => index.toString()}
                        enableEmptySections={true}
                        renderItem={(item) => {
                            return (
                                <>
                                    <Spacer space={wp(0.5)} />
                                    <TouchableOpacity style={{ ...globalStyles.shadow, backgroundColor: colors.background }} onPress={() => onNewsItemClicked(item.item, props)}>
                                        <FastImage source={{ uri: item.item.urlToImage }} style={style.cardImg} />
                                        <View style={style.cardTitleView}>
                                            <TitleText style={style.txtTitle} numberOfLines={3}>{item.item.title}</TitleText>
                                        </View>
                                        <View style={{ ...style.cardTitleView, height: wp(55), backgroundColor: localColors.BLACK_TRANSPARENT_OPTION2 }} />
                                        {item.item.urlToImage === null && <Label style={{ ...style.txtNoImg, color: colors.text }}>{t('no image')}</Label>}
                                    </TouchableOpacity>
                                </>
                            )
                        }}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={() => {
                                setRefreshing(true);
                                actionGetUserFeeds(currentLangCode, page);
                            }} />
                        }
                        onScrollBeginDrag={() => {
                            isLoadingMore && setIsLoadingMore(false);
                        }}
                        ListFooterComponent={renderFooter}
                        onEndReachedThreshold={0.01}
                        onEndReached={info => {
                            searchInput === '' && setIsLoadingMore(true);
                        }} />}
            </View>
        </GlobalFlex>
    );
}