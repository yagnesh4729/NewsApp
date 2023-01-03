import React, { useState, useRef } from 'react';
import { TouchableOpacity, Image, TextInput } from 'react-native';
import globalStyles from '../../res/globalStyles';
import { images } from '../../res/images';
import { wp } from '../../utils/constants';
import { InputWrapper } from './styles';
import { useTheme } from '@react-navigation/native';

export const SearchBar = React.forwardRef((props, ref) => {
    const { colors } = useTheme();
    const refTextInput = useRef(null);
    const [isFocused, setFocused] = useState(false);
    React.useImperativeHandle(
        ref,
        () => ({
            setFocus: inFocus => {
                if (inFocus) {
                    setTimeout(() => refTextInput?.current?.focus(), 700);
                }
                setFocused(() => inFocus);
            },
        }), []);
    return (
        <>
            <InputWrapper editable={props?.editable} style={[globalStyles.shadow, props.mainstyle]}>
                <TextInput
                    ref={refTextInput}
                    autoCapitalize="none"
                    value={props.value}
                    onChangeText={value => props.onChange(value)}
                    style={[props.style, { color: colors.text }]}
                    keyboardType={props.keyboardType ? props.keyboardType : 'default'}
                    returnKeyType={
                        props.returnKeyType ? props.returnKeyType : 'default'
                    }
                    placeholder={props.placeholder}
                    secureTextEntry={props.secureTextEntry}
                    placeholderTextColor={props.placeholderTextColor} />

                {props.value !== '' && <TouchableOpacity onPress={() => props.onChange('')}>
                    <Image
                        source={images.ic_cross}
                        style={{ ...globalStyles.img, height: wp(3.5), width: wp(3.5) }} />
                </TouchableOpacity>}
            </InputWrapper>
        </>
    );
});