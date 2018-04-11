/**
 * Created by zerowolf on 2017/12/6.
 */
import React, {Component} from 'react';
import {
    Platform,
} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

import FirstTab from '../containers/1Tab/FirstTab';
import SecondTab from '../containers/2Tab/SecondTab';
import ThirdTab from '../containers/3Tab/ThirdTab';
import FourthTab from '../containers/4Tab/FourthTab';
import Wealth from '../containers/wealth/Wealth';
// import BaseComponent from '../containers/global/BaseComponent';

import ShiMing from '../containers/4Tab/ShiMing';
import UserInfo from '../containers/4Tab/UserInfo';


import Icon from 'react-native-vector-icons/Ionicons'

const TabNavigation = TabNavigator({
    FirstTab: {
        screen: FirstTab, navigationOptions: {
            tabBarLabel: '钱包',
            tabBarIcon: ({tintColor, focused}) => (
                <Icon name="ios-home-outline" size={18} color={tintColor}/>
            )
        }
    },
    Wealth: {
        screen: Wealth, navigationOptions: {
            tabBarLabel: '理财',
            tabBarIcon: ({tintColor, focused}) => (
                <Icon name="ios-appstore" size={18} color={tintColor}/>

            )
        }
    },
 // SecondTab: {
 //        screen: SecondTab, navigationOptions: {
 //            tabBarLabel: '理财',
 //            tabBarIcon: ({tintColor, focused}) => (
 //                <Icon name="ios-appstore" size={18} color={tintColor}/>
 //
 //            )
 //        }
 //    },

    ThirdTab: {
        screen: ThirdTab, navigationOptions: {
            tabBarLabel: '我的投资',
            tabBarIcon: ({tintColor, focused}) => (
                <Icon name="ios-disc-outline" size={18} color={tintColor}/>

            )
        }
    },
    FourthTab: {
        screen: FourthTab, navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => (
                <Icon name="md-person" size={18} color={tintColor}/>

            )
        },
    }
}, {
    tabBarPosition: 'bottom',
    lazy: true, // 是否懒加载,
    swipeEnabled: true,
    animationEnabled: false,
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'FourthTab',
    tabBarOptions: {
        showIcon: true,
        pressOpacity: 0.8,
        activeTintColor: '#e64747', // 文字和图片选中颜色
        inactiveTintColor: '#707070', // 文字和图片默认颜色
        style: {
            height: 45,
            backgroundColor: 'white',
            zIndex: 0,
            position: 'relative'
        },

        labelStyle: {
            fontSize: 12,
            paddingVertical: 0,
            marginTop: Platform.OS === 'android' ? 0 : 0
        },

        // iconStyle: {
        //     marginTop: 10
        // },
        tabStyle: {
            backgroundColor: 'white',
        },
        indicatorStyle: {
            height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
        },
    }
});

import BaseComponent from '../containers/global/BaseComponent';
import Pay_Plan from '../containers/1Tab/Pay_Plan';
import Pay_Plan_AddCard from '../containers/1Tab/Pay_Plan_AddCard';
import Pay_New_Plan from '../containers/1Tab/Pay_New_Plan';
import Pay_Step from '../containers/1Tab/Pay_Step';
import Pay_Upgrade from '../containers/1Tab/upgrade/Pay_Upgrade';
import Pay_Query from '../containers/1Tab/Pay_Query';
import Pay_Manage from '../containers/1Tab/manage/Pay_Manage';
import RegisterApp from '../containers/regist/RegisterApp';
import RedPlan from '../containers/wealth/redPlan/RedPlan';


export const SNavigator = StackNavigator({

        // Sign: {screen: SignPage},
        // Splash: {screen: Splash},

        RegisterApp: {screen: RegisterApp},
        Tab: {screen: TabNavigation},
        RedPlan: {screen: RedPlan},
        UserInfo: {screen: UserInfo},
        ShiMing: {screen: ShiMing},



        BaseComponent: {screen: BaseComponent},
        // FirstTab: {screen: TabNavigation, path: 'FirstTab'},
        // SecondTab: {screen: TabNavigation, path: 'SecondTab'},
        // ThirdTab: {screen: TabNavigation, path: 'ThirdTab'},
        // FourthTab: {screen: TabNavigation, path: 'FourthTab'},

        Pay_Plan: {screen: Pay_Plan},
        Pay_Plan_AddCard: {screen: Pay_Plan_AddCard},
        Pay_New_Plan: {screen: Pay_New_Plan},
        Pay_Query: {screen: Pay_Query},
        Pay_Manage: {screen: Pay_Manage},
        Pay_Upgrade: {screen: Pay_Upgrade},
        Pay_Step: {screen: Pay_Step},


    },
);
