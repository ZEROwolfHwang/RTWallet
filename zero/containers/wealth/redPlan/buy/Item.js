/**
 * Created by zerowolf Date: 2018/5/1 Time: 下午9:15
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView,TextInput
} from 'react-native';
const {width, height} = Dimensions.get('window');
export default class Item extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        var params  = this.props;
        return <View style={[{
            width,
            height: 60,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
        },params.style]}>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <Text style={[{padding:20,width:120, textAlign:'left'},params.textStyle]}>{params.title}</Text>
                <TextInput underlineColorAndroid={'transparent'}
                           keyboardType={params.keyboardType}
                           style={{flex:1,backgroundColor:'transparent'}}
                           onChangeText={(text)=>{
                               console.log(text);
                               params.onChangeText(text);
                           }}
                           value={params.value}/>
            </View>
            <View style={{height: params.hasLine?0.5:0, backgroundColor: 'lightgrey', width: width - 30}}/>
        </View>
    }
}
