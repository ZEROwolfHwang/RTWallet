/**
 * Created by zerowolf Date: 2018/5/9 Time: 上午11:55
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView
} from 'react-native';
import BaseComponent from "../../global/BaseComponent";
import MyTabView from "../../../views/MyTabView";
import {zdp, zsp} from "../../../utils/ScreenUtil";
const {width, height} = Dimensions.get('window');
export default class ItemDetail extends BaseComponent {

    constructor(props) {
        super(props);

    }
    static defaultProps={
        titleColor:'grey',
        contentColor :'grey'
    }

    render() {
        var params  = this.props;
        return (
            <View style={[{width, height: zdp(40), backgroundColor: 'white', flexDirection: 'row',padding: zdp(20),
                justifyContent: 'space-between', alignItems: 'center'
            },params.style]}>
                <Text style={{fontSize: zsp(16), color: params.titleColor}}>{params.title}</Text>
                <Text style={{fontSize: zsp(16), color: params.contentColor}}>{params.content}</Text>
            </View>
        )
    }
}
