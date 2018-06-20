/**
 * Created by zerowolf Date: 2018/5/1 Time: 下午9:15
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView,TextInput
} from 'react-native';
import {zdp, zsp} from "../../../../utils/ScreenUtil";
import PropTypes from 'prop-types';
const {width, height} = Dimensions.get('window');
export default class Item extends Component {

    constructor(props) {
        super(props);

    }

    static defaultProps={
        isRequired:'',
        maxLength: 21
    }

    render() {
        var params  = this.props;
        return <View style={[{
            width,
            height: zdp(50),
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
        }, params.style]}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',paddingLeft:zdp(15)}}>

                <Text style={{fontSize:zsp(16),color:'red',width:zdp(10)}}>{params.isRequired}</Text>
                <Text style={[{
                    width: zdp(130),
                    fontSize: zsp(16),
                    textAlign: 'left'
                }, params.textStyle]}>{params.title}</Text>
                <TextInput underlineColorAndroid={'transparent'}
                           maxLength={params.maxLength}
                           keyboardType={params.keyboardType}
                           placeholder={params.placeholder}
                           placeholderTextColor={'lightgrey'}
                           style={{flex: 1, fontSize: zsp(16), backgroundColor: 'transparent'}}
                           onChangeText={(text) => {
                               params.onChangeText(text);
                           }}
                           value={params.value}/>
            </View>
            <View style={{
                height: params.hasLine ? 0.5 : 0,
                backgroundColor: 'lightgrey',
                width: width - zdp(30)
            }}/>
        </View>;
    }
}
Item.propTypes = {
    maxLength:PropTypes.number
}
