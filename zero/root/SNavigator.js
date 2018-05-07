/**
 * Created by zerowolf on 2017/12/6.
 */
import React, {Component} from 'react';
import {
    Platform,
} from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';

import FirstTab from '../containers/1Tab/FirstTab';
import SecondTab from '../containers/wealth/SecondTab';
import ThirdTab from '../containers/3Tab/ThirdTab';
import FourthTab from '../containers/4Tab/FourthTab';
import Wealth from '../containers/wealth/Wealth';
// import BaseComponent from '../containers/global/BaseComponent';

import ShiMing from '../containers/4Tab/verify/ShiMing';
import UserInfo from '../containers/4Tab/UserInfo';
import Page_Auto from '../containers/1Tab/Page_Auto';

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


    // Page_Auto: {
    //     screen: Page_Auto, navigationOptions: {
    //         tabBarLabel: '钱包',
    //         tabBarIcon: ({tintColor, focused}) => (
    //             <Icon name="ios-home-outline" size={18} color={tintColor}/>
    //         )
    //     }
    // },
    // Wealth: {
    //     screen: Wealth, navigationOptions: {
    //         tabBarLabel: '理财',
    //         tabBarIcon: ({tintColor, focused}) => (
    //             <Icon name="ios-appstore" size={18} color={tintColor}/>
    //
    //         )
    //     }
    // },


    SecondTab: {
        screen: SecondTab, navigationOptions: {
            tabBarLabel: '理财',
            tabBarIcon: ({tintColor, focused}) => (
                <Icon name="ios-appstore" size={18} color={tintColor}/>

            )
        }
    },

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
    // initialRouteName: 'FirstTab',
    initialRouteName: 'SecondTab',
    // initialRouteName: 'ThirdTab',
    // initialRouteName: 'FourthTab',
    tabBarOptions: {
        showIcon: true,
        pressOpacity: 0.8,
        activeTintColor: '#e64747', // 文字和图片选中颜色
        inactiveTintColor: '#707070', // 文字和图片默认颜色

        style: {
            height: 50,
            backgroundColor: 'white',
            zIndex: 0,
            position: 'relative'
        },

        labelStyle: {
            fontSize: 12,
            paddingVertical: 0,
            marginTop: Platform.OS === 'android' ? 0 : 0
        },

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
import WebView1 from '../containers/3Tab/WebView1';

import IssueHelp from '../containers/wealth/redPlan/IssueHelp'
import AboutApp from '../containers/wealth/redPlan/helpPage/AboutApp'
import WXShare from '../containers/4Tab/WXShare'
import ScrollViewTest from "../containers/wealth/redPlan/ScrollViewTest";
import addPayCard from "../containers/wealth/redPlan/buy/addPayCard";
import InvestBuy from "../containers/wealth/redPlan/buy/InvestBuy";
import RealmTest from "../../zwtest/RealmTest";
import Web from "../containers/wealth/redPlan/buy/Web";

export const SNavigator = StackNavigator({

        // Sign: {screen: SignPage},
        // Splash: {screen: Splash},

        RegisterApp: {screen: RegisterApp},
        addPayCard: {screen: addPayCard},
        Web: {screen: Web},
        InvestBuy: {screen: InvestBuy},
        ShiMing: {screen: ShiMing},
        Tab: {screen: TabNavigation},
        RealmTest: {screen: RealmTest},
        ScrollViewTest: {screen: ScrollViewTest},
        WXShare: {screen: WXShare},
        IssueHelp: {screen: IssueHelp},
        AboutApp: {screen: AboutApp},
        RedPlan: {screen: RedPlan},
        Wealth: {screen: Wealth},
        WebView1: {screen: WebView1},
        Pay_Plan: {screen: Pay_Plan},
        UserInfo: {screen: UserInfo},


        BaseComponent: {screen: BaseComponent},
        // FirstTab: {screen: TabNavigation, path: 'FirstTab'},
        // SecondTab: {screen: TabNavigation, path: 'SecondTab'},
        // ThirdTab: {screen: TabNavigation, path: 'ThirdTab'},
        // FourthTab: {screen: TabNavigation, path: 'FourthTab'},

        Page_Auto: {screen: Page_Auto},
        Pay_Plan_AddCard: {screen: Pay_Plan_AddCard},
        Pay_Manage: {screen: Pay_Manage},
        Pay_New_Plan: {screen: Pay_New_Plan},
        Pay_Query: {screen: Pay_Query},
        Pay_Upgrade: {screen: Pay_Upgrade},
        Pay_Step: {screen: Pay_Step},
    },
);
