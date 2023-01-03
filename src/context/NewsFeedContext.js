import React, { createContext, useState, } from 'react';
import { GET_DATA } from '../api_helper/ApiServices';

export const NewsFeedContext = createContext(null);
export const NewsFeedProvider = props => {
    //#region state
    const [globalFeedData, setGlobalFeedData] = useState([]);
    const [globalSearchFeedData, setGlobalSearchFeedData] = useState([]);
    const [selectedFeedData, setSelectedFeedData] = useState('');
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [isReached, setIsReached] = useState(false);
    const [update, setUpdate] = useState(0);
    //#endregion state

    //#region actions
    const actionGetUserFeeds = async (lang, page) => {
        console.log("lang : ", lang);
        console.log("page : ", page);
        GET_DATA(`https://newsapi.org/v2/top-headlines?language=${lang}&page=${page}`, (data) => {
            console.log("actionGetUserFeeds response data : ", data);
            if (data?.status == "ok") {
                if (page === 1) {
                    setGlobalFeedData(data.articles);
                } else {
                    setGlobalFeedData([...globalFeedData, ...data.articles]);
                }
                isRateLimited && setIsRateLimited(false);
                isReached && setIsReached(false);
            } else if (data == "rateLimited") {
                setIsRateLimited(true);
            } else if (data == "maximumResultsReached") {
                setIsReached(true);
                setUpdate(Math.floor(Math.random() * 100) + 1);
            }
        })
    };
    const actionSearchUserFeeds = async (query, lang) => {
        GET_DATA(`https://newsapi.org/v2/top-headlines?q=${query}&language=${lang}&pageSize=100`, (data) => {
            if (data?.status == "ok") {
                setGlobalSearchFeedData(data.articles);
            }
        })
    };
    const onNewsItemClicked = (item, props) => {
        setSelectedFeedData(item);
        props.navigation.navigate('NewsDetails');
    }
    //#endregion actions
    return (
        <NewsFeedContext.Provider
            value={{
                state: {
                    globalFeedData,
                    globalSearchFeedData,
                    selectedFeedData,
                    isRateLimited,
                    isReached
                },
                actionGetUserFeeds,
                actionSearchUserFeeds,
                onNewsItemClicked
            }}>
            {props.children}
        </NewsFeedContext.Provider>
    );
};