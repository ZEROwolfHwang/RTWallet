/**
 * Created by zerowolf Date: 2018/4/20 Time: 下午11:53
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView
} from 'react-native';
import {TabBarTop,TabNavigator} from 'react-navigation';

const {width, height} = Dimensions.get('window');
import TabOne from './detailItem/TabOne';
import TabTwo from './detailItem/TabTwo';
import TabThree from './detailItem/TabThree';
import {cusColors} from "../../../value/cusColor/cusColors";
import {zsp} from "../../../utils/ScreenUtil";
import {cusTabUtil} from "../../../utils/TabUtil";


export default TabNavigator({
    TabOne: { screen: TabOne ,navigationOptions: {
            tabBarLabel: '产品介绍',
        }},
    TabTwo: { screen: TabTwo ,navigationOptions: {
            tabBarLabel: '加入记录',
        }},
    TabThree: { screen: TabThree ,navigationOptions: {
            tabBarLabel: '常见问题',
        }},
},{
    // activeBackgroundColor:'transparent',
    // inactiveBackgroundColor:'transparent',
    initialRouteName:'TabOne',
    tabBarOptions: cusTabUtil.tabBarOptions,
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
});
