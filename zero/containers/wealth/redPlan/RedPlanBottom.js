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
    tabBarOptions: {
        backgroundColor:'white',
        activeTintColor: cusColors.linear_default,
        inactiveTintColor: 'grey',
        activeBackgroundColor:'black',
        inactiveBackgroundColor:'yellow',
        labelStyle: {
            fontSize: zsp(13),
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
            // height: zdp(10) , // 如TabBar下面显示有一条线，可以设高度为0后隐藏
            backgroundColor:cusColors.linear_default
        },
    },
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
});
