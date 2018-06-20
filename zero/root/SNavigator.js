/**
 * Created by zerowolf on 2017/12/6.
 */
import React, {Component} from 'react';
import {
    Platform,
} from 'react-native';
import {TabNavigator, StackNavigator, TabBarTop, NavigationActions} from 'react-navigation';

import FirstTab from '../containers/1Tab/FirstTab';
import SecondTab from '../containers/wealth/SecondTab';
import ThirdTab from '../containers/3Tab/ThirdTab';
import FourthTab from '../containers/4Tab/FourthTab';
import Wealth from '../containers/wealth/Wealth';
// import BaseComponent from '../containers/global/BaseComponent';

import Page_Auto from '../containers/1Tab/Page_Auto';

import Icon from 'react-native-vector-icons/Ionicons'

const TabNavigation = TabNavigator({
    FirstTab: {
        screen: FirstTab, navigationOptions: {
            tabBarLabel: '钱包',
            tabBarIcon: ({tintColor, focused}) => (
                <Icon name="ios-home-outline" size={zdp(25)}
                      color={focused ? cusColors.linear_default : cusColors.main_default}/>
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
            tabBarLabel: '刷卡支付',
            tabBarIcon: ({tintColor, focused}) => (
                <Icon name="ios-appstore" size={zdp(25)}
                      color={focused ? cusColors.linear_default : cusColors.main_default}/>

            )
        }
    },

    ThirdTab: {
        screen: ThirdTab, navigationOptions: {
            tabBarLabel: '完美还款',
            tabBarIcon: ({tintColor, focused}) => (
                <Icon name="ios-disc-outline" size={zdp(25)}
                      color={focused ? cusColors.linear_default : cusColors.main_default}/>

            )
        }
    },
    FourthTab: {
        screen: FourthTab, navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => (
                <Icon name="md-person" size={zdp(25)}
                      color={focused ? cusColors.linear_default : cusColors.main_default}/>

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
        activeTintColor: cusColors.linear_default, // 文字和图片选中颜色
        inactiveTintColor: '#707070', // 文字和图片默认颜色

        /*  style: {
              // marginTop:0,
              paddingTop: 0,
              height: zdp(60),
              backgroundColor: 'white',
              zIndex: 0,
              position:'relative'
          },

          labelStyle: {
              fontSize: zsp(13),
              paddingVertical: 0,
              marginTop: Platform.OS === 'android' ? 0 : 0
          },

          tabStyle: {
              backgroundColor: 'white',
          },

          indicatorStyle: {
              height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
          },*/

        style: {
            backgroundColor: 'white'
        },
        indicatorStyle: {
            opacity: 0
        },
        iconStyle: {
            paddingTop: 0,
            padding: 0,
            marginTop: zdp(10),
            width: zdp(30),
            height: zdp(30),
        },
        labelStyle: {
            fontSize: zsp(13),
            marginTop: 0,
            padding: 0,
        },
        tabStyle: {
            height: zdp(60),
            alignItems: 'center',
            justifyContent: 'center',

        }
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
// import TransactionRecord from "../containers/4Tab/bills/TransactionRecord";
import BankManageTabOne from "../containers/4Tab/BankManage/tabItem/BankManageTabOne";

import BankManageTabTwo from "../containers/4Tab/BankManage/tabItem/BankManageTabTwo";
import CardManage from "../containers/4Tab/BankManage/CardManage";
import DetailRecord from "../containers/4Tab/bills/DetailRecord";
import TransactionRecord from "../containers/4Tab/bills/TransactionRecord";
import CardDefault from "../containers/4Tab/defaltCard/CardDefault";
import ForgetPsw from "../containers/regist/ForgetPsw";
import RegisterMerchant from "../containers/regist/RegisterMerchant";
import RegisterMerchantNext from "../containers/regist/RegisterMerchantNext";
import RegisterApp from "../containers/regist/RegisterApp";
import LoginByVerify from "../containers/regist/LoginByVerify";
import RegisterSuccess from "../containers/regist/RegisterSuccess";
import DefaultCardManage from "../containers/4Tab/defaltCard/DefaultCardManage";
import SwipeDeleteCard from "../containers/4Tab/BankManage/SwipeDeleteCard";
import PageSetting from "../containers/4Tab/set/PageSetting";
import PageChangePsw from "../containers/4Tab/set/PageChangePsw";
import MerchantInfo from "../containers/4Tab/userInfo/MerchantInfo";
import PageChangePhone from "../containers/4Tab/set/PageChangePhone";
import PageChangePhoneNext from "../containers/4Tab/set/PageChangePhoneNext";
import BankCardManage from "../containers/4Tab/BankManage/BankCardManage";
import BankManageTabAll from "../containers/4Tab/BankManage/tabItem/BankManageTabAll";
import BankManageTabs from "../containers/4Tab/BankManage/BankManageTabs";
import DeleteCard from "../containers/4Tab/BankManage/tabItem/DeleteCard";
import LaunchPage from "../containers/regist/LaunchPage";
import LoginByGesture from "../containers/regist/LoginByGesture";
import PageGesture from "../containers/4Tab/set/gesture/PageGesture";
import PageSetGesturePsw from "../containers/4Tab/set/gesture/PageSetGesturePsw";
import PageChangeGesturePsw from "../containers/4Tab/set/gesture/PageChangeGesturePsw";
import PageReplay from "../containers/3Tab/PageReplay";
import PageReplayDetail from "../containers/3Tab/PageReplayDetail";
import addCreditCard from "../containers/wealth/redPlan/buy/addCreditCard";
import VerifyByGesture from "../containers/regist/VerifyByGesture";
import {cusColors} from "../value/cusColor/cusColors";
import {zdp, zsp} from "../utils/ScreenUtil";
import Test1 from "../containers/1Tab/test/Test1";
import Test2 from "../containers/1Tab/test/Test2";


const setting = {
    MerchantInfo: {screen: MerchantInfo},
}
const main = {
    Test1: {screen: Test1},
    Test2: {screen: Test2},
}

const SNavigator = StackNavigator({

        // Sign: {screen: SignPage},
        // Splash: {screen: Splash},

        RegisterApp: {screen: RegisterApp},
        Web: {screen: Web},
        ...setting,
        ...main,
        RegisterSuccess: {screen: RegisterSuccess},
        addCreditCard: {screen: addCreditCard},
        VerifyByGesture: {screen: VerifyByGesture},
        PageReplayDetail: {screen: PageReplayDetail},
        // PageReplay: {screen: PageReplay},
        LaunchPage: {screen: LaunchPage},
        PageChangeGesturePsw: {screen: PageChangeGesturePsw},
        PageGesture: {screen: PageGesture},
        PageSetGesturePsw: {screen: PageSetGesturePsw},
        LoginByGesture: {screen: LoginByGesture},
        BankCardManage: {screen: BankCardManage},
        DeleteCard: {screen: DeleteCard},
        BankManageTabs: {screen: BankManageTabs},
        BankManageTabAll: {screen: BankManageTabs, path: 'BankManageTabAll'},
        BankManageTabOne: {screen: BankManageTabs, path: 'BankManageTabOne'},
        BankManageTabTwo: {screen: BankManageTabs, path: 'BankManageTabTwo'},


        PageChangePhone: {screen: PageChangePhone},
        PageChangePhoneNext: {screen: PageChangePhoneNext},

        PageSetting: {screen: PageSetting},
        PageChangePsw: {screen: PageChangePsw},
        SwipeDeleteCard: {screen: SwipeDeleteCard},
        DefaultCardManage: {screen: DefaultCardManage},
        RegisterMerchant: {screen: RegisterMerchant},
        RegisterMerchantNext: {screen: RegisterMerchantNext},
        LoginByVerify: {screen: LoginByVerify},
        ForgetPsw: {screen: ForgetPsw},
        CardDefault: {screen: CardDefault},
        TransactionRecord: {screen: TransactionRecord},
        DetailRecord: {screen: DetailRecord},
        CardManage: {screen: CardManage},
        // BankManageTabs: {screen: BankManageTabs},


        addPayCard: {screen: addPayCard},
        InvestBuy: {screen: InvestBuy},
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


// const WeLoggedIn = StackNavigator({
//     BankManage: {screen: BankManage},
//     LandingPad: {             // if you don't specify an initial route,
//         screen: Tab     // the first-declared one loads first
//     }
// });                               // this one would load when you do
// export default createBottomTabNavigator(
//     {
//         Home: HomeStack,
//         Settings: SettingsStack,
//     },
//     {
//         /* Other configuration remains unchanged */
//     }
// );
/*
const INITIAL_STATE = SNavigator1.router.getStateForAction(NavigationActions.init())

// this is pretty much a standard reducer, but it looks fancy
// all it cares about is "did the navigation stack change?"
// if yes => update the stack
// if no => pass current stack through
export const  SNavigator = (state = INITIAL_STATE, action) => {
    const nextState = SNavigator1.router.getStateForAction(action, state)

    return nextState || state
}
*/
export {
    SNavigator
}

//XAka34A2rVRYJ4XBIU35UZMUEEF64CMMIYZCK2FZZUQNODEKUHGJLFMSLIQMQUCUBXRENLK6NZL37JXP4PZXQFILMQ2RG5R
