/**
 * Created by zerowolf Date: 2018/5/5 Time: 下午3:32
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView
} from 'react-native';
const {width, height} = Dimensions.get('window');
export default class ItemAddCard extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        var params  = this.props;
        return  <View style={[{
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
                <Text style={{padding: 20,width:120,textAlign:'left'}}>{params.title}</Text>
                <Text style={{flex: 1,textAlign:'left'}}>
                    {params.content}
                </Text>
            </View>
            <View style={{height: params.hasLine?0.5:0, backgroundColor: 'lightgrey', width: width - 30}}/>
        </View>
    }
}
