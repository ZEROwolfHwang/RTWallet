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


// export const BankTabs = TabNavigator({
export default TabNavigator({
    BankManageTabAll: {
        screen: BankManageTabAll, navigationOptions: {
            tabBarLabel: '总的',
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
    tabBarOptions: {
        backgroundColor: 'white',
        activeTintColor: cusColors.linear_default,
        inactiveTintColor: 'grey',
        activeBackgroundColor: 'black',
        inactiveBackgroundColor: 'yellow',
        labelStyle: {
            fontSize: zsp(13),
            paddingVertical: 0,
            marginTop: Platform.OS === 'android' ? 0 : zdp(5),
        },
        style: {
            backgroundColor: 'white',
            elevation: 0
        },

        // iconStyle: {
        //     marginTop: zdp(10)
        // },
        tabStyle: {
            backgroundColor: 'transparent',
        },
        indicatorStyle: {
            // height: zdp(10) , // 如TabBar下面显示有一条线，可以设高度为0后隐藏
            backgroundColor: cusColors.linear_default
        },
    },
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: true,
});

