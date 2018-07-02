/**
 * Created by zerowolf on 2018/1/3.
 */
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text, Alert,
    View,
    TextInput,
    Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window')
import PropTypes from 'prop-types';
import {zdp, zsp} from "../utils/ScreenUtil";


export default class MyTextInput extends Component {
    constructor(props) {
        super(props);

    }

    static defaultProps = {
        keyboardType: 'default',
        style: {},
        value: null,
        placeholder: '请输入内容',
        secureTextEntry: false,
    };

    render() {
        var param = this.props;
        return (
            <TextInput
                secureTextEntry={param.secureTextEntry}
                keyboardType={param.keyboardType}
                underlineColorAndroid={'transparent'}
                style={[styles.textInputStyle_01, param.style]}
                placeholder={param.placeholder}
                placeholderTextColor={'lightgrey'}
                onChangeText={(text) => {
                    param.onChangeText(text)
                }}
                value={param.value}/>
        )
    }
}

const styles = StyleSheet.create({
    textInputStyle_01: {
        fontSize: zsp(15),
        marginTop: zdp(10),
        width: width - zdp(20),
        fontFamily: Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
        height: zdp(60),
        backgroundColor: 'transparent',
        textAlign: 'left',
        borderRadius: zdp(5),
        borderColor:'white',
        borderWidth:1,
    }
})


MyTextInput.propTypes = {
    style: PropTypes.object,
    keyboardType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
};
