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
    Dimensions, Image
} from 'react-native';

const {width, height} = Dimensions.get('window')
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {zdp, zsp} from "../utils/ScreenUtil";

export default class MyIconTextWithTextInput extends Component {
    constructor(props) {
        super(props);

    }

    static defaultProps = {
        keyboardType: 'default',
        style: {},
        textInputStyle: {},
        value: null,
        placeholder: '',
        iconName:'phone',
        iconSize:zdp(30),
        iconColor:'white',
        placeholderTextColor:'white',
        maxLength :19,
        secureTextEntry:false

    };


    render() {
        var param = this.props;
        return (
            <View style={[{
                marginTop: zdp(20),
                width: width-zdp(20),
                height: zdp(50),
                flexDirection: 'row',
                backgroundColor: 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: zdp(5),
            }, param.style]}

            >

                {/*<Image style={{width:zdp(30),height:zdp(30)}} source={require('../../resource/image/qianbao.png')}/>*/}

                <Icon size={zdp(25)} name={param.iconName}
                      style={{
                          color: param.iconColor,
                          padding: zdp(10),
                          backgroundColor: 'transparent'
                      }}/>

                <Text style={{width:zdp(100),fontSize: zsp(17), color:'white',backgroundColor:'transparent',textAlign:'left'}}>
                    {param.title}
                </Text>

                <TextInput
                    // password={true}
                    secureTextEntry={param.secureTextEntry}
                    editable={param.editable?param.editable:true}
                    keyboardType={param.keyboardType}
                    autoCapitalize={'none'}
                    underlineColorAndroid={'transparent'}
                    style={[styles.textInputStyle_01, param.textInputStyle]}
                    placeholder={param.placeholder}
                    placeholderTextColor={param.placeholderTextColor}
                    maxLength={param.maxLength}
                    onChangeText={(text) => {
                        param.onChangeText(text)
                    }}
                    value={param.value}/>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    textInputStyle_01: {
        flex: 1,
        fontSize:zsp(16),
        color: 'white',
        height: zdp(50),
        backgroundColor: 'transparent',
        textAlign: 'left',
    }
})


MyIconTextWithTextInput.propTypes = {
    style: PropTypes.object,
    keyboardType: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    placeholderTextColor:PropTypes.string,
    value: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
    textInputStyle: PropTypes.object,
    iconName:PropTypes.string.isRequired,
    iconSize:PropTypes.number,
    iconColor:PropTypes.string,
    maxLength: PropTypes.number,
    secureTextEntry:PropTypes.bool
};
