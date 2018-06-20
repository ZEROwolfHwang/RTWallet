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
    tabBarOptions: {
        backgroundColor:'white',
        activeTintColor: cusColors.linear_default,
        inactiveTintColor: 'grey',
        activeBackgroundColor:'black',
        inactiveBackgroundColor:'yellow',
        labelStyle: {
            fontSize: zsp(14),
            paddingVertical: 0,
            marginTop: Platform.OS === 'android' ? 0 : 0,
        },
        style :{
            backgroundColor:'white',
            elevation:0
        },

        // iconStyle: {
        //     marginTop: zdp(10)
        // },
        tabStyle: {
            backgroundColor: 'transparent',
        },
        indicatorStyle: {
            // height: 10 , // 如TabBar下面显示有一条线，可以设高度为0后隐藏
            backgroundColor:cusColors.linear_default
        },
    },
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
});

