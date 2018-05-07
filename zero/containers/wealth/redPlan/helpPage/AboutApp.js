/**
 * Created by zerowolf Date: 2018/4/21 Time: 下午5:22
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions,ListView
} from 'react-native';
const {width, height} = Dimensions.get('window');
import MyTabView from '../../../../views/MyTabView';
import BaseComponent from '../../../global/BaseComponent';
export default class AboutApp extends BaseComponent {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <MyTabView titleColor={'black'} title={'标题'}
                           leftView={true}
                           navigation={this.props.navigation}/>

            </View>)
    }
}
