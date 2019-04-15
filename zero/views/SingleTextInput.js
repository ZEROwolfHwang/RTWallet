/**
 * Created by zerowolf Date: 2018/6/14 Time: 下午5:16
 */

import {cusColors} from "../value/cusColor/cusColors";

/**
 * Created by zerowolf Date: 2018/5/16 Time: 下午2:57
 */
const {width, height} = Dimensions.get('window');
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Platform,
    StyleSheet,
    TextInput,
    Text,
    Alert,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    ListView
} from 'react-native';
import {zdp, zsp} from "../utils/ScreenUtil";

export default class SingleTextInput extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps = {
        keyboardType: 'default',
        style: {},
        value: null,
        placeholder: '请输入内容',
        underlineColorAndroid: 'transparent',
        placeholderTextColor: cusColors.text_placeHold,
        maxLength: 21,
        clearButtonMode: 'never',  //while-editing  unless-editing always
        returnKeyType: 'done',
        editable: true,
        secureTextEntry: false, //安全密码
        refs: () => {
        },
        autoCapitalize: 'none',//none:不自动切换任何字符大写 sentences:默认每个句子的首字母大写 words:每个单词的首字母变成大写 characters:每个字母全部变成大写
        fontSize: zsp(17),
        defaultValue: '',
        multiline: false,
        blurOnSubmit: true
    };


    render() {
        var params = this.props;
        return <TextInput
            ref={(ref) => params.refs(ref)}
            maxLength={params.maxLength}
            keyboardType={params.keyboardType}
            onFocus={params.onFocus}
            onBlur={params.onBlur}
            returnKeyType={params.returnKeyType}
            autoCapitalize={params.autoCapitalize}
            defaultValue={params.defaultValue}
            underlineColorAndroid={params.underlineColorAndroid}
            blurOnSubmit={params.blurOnSubmit}
            multiline={params.multiline}
            style={[{
                fontFamily: Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
                fontSize: params.fontSize,
                width: width - zdp(60),
                // height: zdp(50),
                backgroundColor: 'transparent',
                textAlign: 'left',
                color: cusColors.text_main
            }, params.style]}
            placeholder={params.placeholder}
            placeholderTextColor={params.placeholderTextColor}
            clearButtonMode={'while-editing'}
            onChangeText={(text) => {
                params.onChangeText(text)
            }}
            editable={params.editable}
            onChange={params.onChange}
            onPress={params.onPress}
            secureTextEntry={params.secureTextEntry}
            value={params.value}/>;
    }
}
SingleTextInput.propTypes = {
    maxLength: PropTypes.number,
    keyboardType: PropTypes.string,
    underlineColorAndroid: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    placeholderTextColor: PropTypes.string,
    clearButtonMode: PropTypes.string,
    value: PropTypes.string,
    editable: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    returnKeyType: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    autoCapitalize: PropTypes.string,
    defaultValue: PropTypes.string,
    style: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    multiline: PropTypes.bool
}
