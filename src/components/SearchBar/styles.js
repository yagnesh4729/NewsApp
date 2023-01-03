import styled from 'styled-components/native';
import { colors } from '../../res/colors';
import { wp } from '../../utils/constants';

const InputWrapper = styled.View`
  align-self: center;
  align-items: center;
  padding: 5px;
  border-width: 0.1px;
  width: ${wp(90)};
  border-radius:${wp(5)};
  border-color: ${props =>
        props?.isFocused
            ? colors.PRIMARY_COLOR
            : props?.editable !== false
                ? colors.BLACK2
                : colors.HUSKY};
`;

const TextInput = styled.TextInput`
  padding-start: 0;
  color: ${props =>
        props?.editable !== false ? colors.BLACK2 : colors.grayDark};  
  padding: ${wp(5)}px;
  font-size: ${wp(4.5)};
  padding-bottom: ${wp(3)};
`;

const ShowTouch = styled.TouchableOpacity`
  padding: 2px;
  margin-right: 5px;
  align-self: center;
  margin-bottom: -5px;
  justify-content: center;
`;

const ChevronWrapper = styled.View`
  padding: 2px;
  margin-right: 5px;
  align-self: center;
  margin-bottom: -15px;
  justify-content: center;
`;

export { InputWrapper, TextInput, ShowTouch, ChevronWrapper };