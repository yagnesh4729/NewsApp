import React, { createContext, useState } from 'react';
import i18n from '../assets/i18n/i18n';
import { getData, saveData } from '../utils/asyncStorageHelper';

export const SettingsContext = createContext(null);
export const SettingsProvider = props => {
    //#region state
    const [globalLanguageOptions, setGlobalLanguageOptions] = useState([
        { title: 'English', code: 'en', isSelected: true },
        { title: 'Français', code: 'fr', isSelected: false },
        { title: 'عربي', code: 'ar', isSelected: false }
    ]);
    const [currentLangCode, setCurrentLangCode] = useState('');
    const [update, setUpdate] = useState(0);
    //#endregion state

    //#region actions
    const actionLanguageSelection = (item) => {
        languageOptions(item.code);
    };
    const changeLanguage = value => {
        i18n
            .changeLanguage(value)
            .then(() => { })
            .catch(err => console.log(err));
    };
    const actionGetCurrentLanguage = () => {
        getData('currentLanguage', (value) => {
            changeLanguage(value === null ? 'en' : value);
            languageOptions(value === null ? 'en' : value);
        })
    }
    const languageOptions = (value) => {
        globalLanguageOptions.forEach((element, i) => {
            value === element.code ? (element.isSelected = true,
                changeLanguage(element.code),
                setCurrentLangCode(element.code),
                saveData('currentLanguage', element.code)) : element.isSelected = false;
        });
        setGlobalLanguageOptions(globalLanguageOptions);
        setUpdate(Math.floor(Math.random() * 100) + 1);
    }
    //#endregion actions
    return (
        <SettingsContext.Provider
            value={{
                state: {
                    globalLanguageOptions,
                    currentLangCode
                },
                actionLanguageSelection,
                actionGetCurrentLanguage
            }}>
            {props.children}
        </SettingsContext.Provider>
    );
};