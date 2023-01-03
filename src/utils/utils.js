//#region import 
//#region RN
import { Component } from "react";
import { Animated, Alert } from "react-native";
import { APP_NAME } from "./constants";
//#endregion
//#region third party libs
//#endregion
//#endregion

export default class Util extends Component {
    static isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };
    static slideLeftAnim = (moveAnimation, xValue, axis, callBack) => {
        Animated.timing(moveAnimation, {
            toValue: { x: axis !== 'y' ? xValue : 0, y: axis === 'y' ? xValue : 0 },
            duration: 300
        }).start(() => callBack !== undefined && callBack())
    }
    static toValueAnimation = (valueAnimation, toValue, type, callBack) => {
        Animated.timing(valueAnimation, {
            toValue: toValue,
            duration: type === 'fade' ? 300 : type === 'fade1' ? 1000 : type === 'shrink' ? 400 : type === 'cardAction' ? 50 : 150
        }).start(() => callBack !== undefined && callBack());
    }

    static showAlert(msg) {
        Alert.alert(
            APP_NAME,
            '' + msg,
            [
                {
                    text: 'OK',
                    onPress: () => { },
                },
            ],
            {
                cancelable: false,
            }
        )
    }
}