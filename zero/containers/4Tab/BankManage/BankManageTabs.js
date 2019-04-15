/**
 * Created by zerowolf Date: 2018/5/7 Time: 下午6:04
 */
/**
 * Created by zerowolf Date: 2018/4/20 Time: 下午11:53
 */
import React, {Component} from 'react';
import {
    Platform, Dimensions,
} from 'react-native';
import {StackNavigator, TabBarTop, TabNavigator} from 'react-navigation';

const {width, height} = Dimensions.get('window');
import BankManageTabOne from './tabItem/BankManageTabOne';
import BankManageTabTwo from './tabItem/BankManageTabTwo';
import BankManageTabAll from "./tabItem/BankManageTabAll";
import {cusColors} from "../../../value/cusColor/cusColors";
import {zdp, zsp} from "../../../utils/ScreenUtil";
import {cusTabUtil} from "../../../utils/TabUtil";


// export const BankTabs = TabNavigator({
export default TabNavigator({
    BankManageTabAll: {
        screen: BankManageTabAll, navigationOptions: {
            tabBarLabel: '所有',
        }
    },
    BankManageTabOne: {
        screen: BankManageTabOne, navigationOptions: {
            tabBarLabel: '结算卡',
        }
    },
    BankManageTabTwo: {
        screen: BankManageTabTwo, navigationOptions: {
            tabBarLabel: '支付卡',
        }
    },
}, {
    // activeBackgroundColor:'transparent',
    // inactiveBackgroundColor:'transparent',
    initialRouteName: 'BankManageTabAll',
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: cusTabUtil.tabBarOptions,
});

