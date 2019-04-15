/**
 * Created by zerowolf Date: 2018/5/7 Time: 下午6:04
 */
/**
 * Created by zerowolf Date: 2018/4/20 Time: 下午11:53
 */
import React, {Component} from 'react';
import {
    Platform, StyleSheet, Text, Alert, View, TouchableOpacity, Image, Dimensions, ListView
} from 'react-native';
import {TabBarTop, TabNavigator, StackNavigator, addNavigationHelpers} from 'react-navigation';

const {width, height} = Dimensions.get('window');
import TabOne from './tabItem/TabOne';
import TabTwo from './tabItem/TabTwo';
import TabThree from './tabItem/TabThree';
import {zsp} from "../../../utils/ScreenUtil";
import {cusColors} from "../../../value/cusColor/cusColors";
import {cusTabUtil} from "../../../utils/TabUtil";


export default TabNavigator({
    TabOne: { screen: TabOne ,navigationOptions: {
            tabBarLabel: '全部',
        }},
    TabTwo: { screen: TabTwo ,navigationOptions: {
            tabBarLabel: '刷卡支付',
        }},
    TabThree: { screen: TabThree ,navigationOptions: {
            tabBarLabel: '完美还款',
        }},
},{
    // activeBackgroundColor:'transparent',
    // inactiveBackgroundColor:'transparent',
    initialRouteName:'TabOne',
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: cusTabUtil.tabBarOptions,
});

