/**
 * Created by zerowolf Date: 2018/4/27 Time: 上午12:52
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView,ProgressBarAndroid
} from 'react-native';
const {width, height} = Dimensions.get('window');

export default class MyProgressBar extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ProgressBarAndroid styleAttr="Inverse"/>
            </View>)
    }
}
