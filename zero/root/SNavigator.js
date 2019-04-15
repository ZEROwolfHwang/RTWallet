/**
 * Created by zerowolf on 2017/12/6.
 */
import React, {Component} from 'react';
import {
    Image,
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
                <Image source={{uri: focused?'tabbar_icon1':'tabbar_default_icon1'}}
                       resizeMode={'contain'}
                       style={{
                           width: zdp(25),
                           height:zdp(25),
                           backgroundColor: 'transparent'
                       }}/>
                // <Icon name="ios-home-outline" size={zdp(25)}
                //       color={focused ? cusColors.linear_default : cusColors.main_default}/>
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
                <Image source={{uri: focused?'tabbar_icon2':'tabbar_default_icon2'}}
                       resizeMode={'contain'}
                       style={{
                           width: zdp(25),
                           height:zdp(25),
                           backgroundColor: 'transparent'
                       }}/>
                // <Icon name="ios-appstore" size={zdp(25)}
                //       color={focused ? cusColors.linear_default : cusColors.main_default}/>

            )
        }
    },

    ThirdTab: {
        screen: ThirdTab, navigationOptions: {
            tabBarLabel: '完美还款',
            tabBarIcon: ({tintColor, focused}) => (
                <Image source={{uri: focused?'tabbar_icon3':'tabbar_default_icon3'}}
                       resizeMode={'contain'}
                       style={{
                           width: zdp(25),
                           height:zdp(25),
                           backgroundColor: 'transparent'
                       }}/>
                // <Icon name="ios-disc-outline" size={zdp(25)}
                //       color={focused ? cusColors.linear_default : cusColors.main_default}/>

            )
        }
    },
    FourthTab: {
        screen: FourthTab, navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => (
                <Image source={{uri: focused?'tabbar_icon4':'tabbar_default_icon4'}}
                       resizeMode={'contain'}
                       style={{
                           width: zdp(25),
                           height:zdp(25),
                           backgroundColor: 'transparent'
                       }}/>
                // <Icon name="md-person" size={zdp(25)}
                //       color={focused ? cusColors.linear_default : cusColors.main_default}/>

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
    initialRouteName: InitConfig.initialRouteName,
    // backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions: {
        showIcon: true,
        pressOpacity: 0.8,
        activeTintColor: cusColors.linear_default, // 文字和图片选中颜色
        inactiveTintColor: '#707070', // 文字和图片默认颜色
        style: {
            backgroundColor: 'white',
            height: zdp(65)
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
            fontFamily: Platform.OS === 'ios' ? 'PingFang TC' : 'PingFang TC',
            fontSize: zsp(13),
            marginTop: 0,
            padding: 0,
        },

        tabStyle: {
            height: zdp(65),
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
import addPayCard from "../containers/wealth/redPlan/buy/addPayCard";
import InvestBuy from "../containers/wealth/redPlan/buy/InvestBuy";
import RealmTest from "../../zwtest/RealmTest";
import Web from "../containers/wealth/redPlan/buy/Web";
// import TransactionRecord from "../containers/4Tab/bills/TransactionRecord";
import BankManageTabOne from "../containers/4Tab/BankManage/tabItem/BankManageTabOne";

import BankManageTabTwo from "../containers/4Tab/BankManage/tabItem/BankManageTabTwo";
import DetailRecord from "../containers/4Tab/bills/DetailRecord";
import TransactionRecord from "../containers/4Tab/bills/TransactionRecord";
import CardDefault from "../containers/4Tab/defaltCard/CardDefault";
import ForgetPsw from "../containers/regist/ForgetPsw";
import RegisterMerchant from "../containers/regist/RegisterMerchant";
import RegisterMerchantNext from "../containers/regist/RegisterMerchantNext";
import LoginByVerify from "../containers/regist/LoginByVerify";
import RegisterSuccess from "../containers/regist/RegisterSuccess";
import DefaultCardManage from "../containers/4Tab/defaltCard/DefaultCardManage";
import PageSetting from "../containers/4Tab/set/PageSetting";
import PageChangePsw from "../containers/4Tab/set/PageChangePsw";
import MerchantInfo from "../containers/4Tab/userInfo/MerchantInfo";
import PageChangePhone from "../containers/4Tab/set/PageChangePhone";
import PageChangePhoneNext from "../containers/4Tab/set/PageChangePhoneNext";
import BankCardManage from "../containers/4Tab/BankManage/BankCardManage";
import BankManageTabAll from "../containers/4Tab/BankManage/tabItem/BankManageTabAll";
import BankManageTabs from "../containers/4Tab/BankManage/BankManageTabs";
import LaunchPage from "../containers/regist/LaunchPage";
import LoginByGesture from "../containers/regist/LoginByGesture";
import PageGesture from "../containers/4Tab/set/gesture/PageGesture";
import PageSetGesturePsw from "../containers/4Tab/set/gesture/PageSetGesturePsw";
import PageChangeGesturePsw from "../containers/4Tab/set/gesture/PageChangeGesturePsw";
import VerifyByGesture from "../containers/regist/VerifyByGesture";
import {cusColors} from "../value/cusColor/cusColors";
import {zdp, zsp} from "../utils/ScreenUtil";
import Test1 from "../containers/1Tab/test/Test1";
import Test2 from "../containers/1Tab/test/Test2";
import InviteFriend from "../containers/4Tab/InviteFriend";
import AddCardPlan from "../containers/3Tab/AddCardPlan";
import SelectCreditCard from "../containers/3Tab/SelectCreditCard";
import EditCardInfo from "../containers/3Tab/EditCardInfo";
import PlanDetail from "../containers/3Tab/PlanDetail";
import {InitConfig} from "./InitConfig";
import RepayPlanRecord from "../containers/3Tab/RepayPlanRecord";


const setting = {
    MerchantInfo: {screen: MerchantInfo},
    RepayPlanRecord: {screen: RepayPlanRecord},
    InviteFriend: {screen: InviteFriend},
}
const main = {
    Test1: {screen: Test1},
    Test2: {screen: Test2},
}
const register = {
    RegisterSuccess: {screen: RegisterSuccess},
    RegisterMerchantNext: {screen: RegisterMerchantNext},
    RegisterMerchant: {screen: RegisterMerchant},
    LoginByVerify: {screen: LoginByVerify},
    ForgetPsw: {screen: ForgetPsw},
};



const cardPlan ={
    AddCardPlan: {screen: AddCardPlan},
    SelectCreditCard: {screen: SelectCreditCard},
    EditCardInfo: {screen: EditCardInfo},
    PlanDetail: {screen: PlanDetail},
    // ThirdTab1: {screen: TabNavigation, path: 'ThirdTab'},
}

const SNavigator = StackNavigator({

        // Sign: {screen: SignPage},
        ...InitConfig.launch,
        ...register,
        ...cardPlan,
        Web: {screen: Web},
        ...setting,
        ...main,
        VerifyByGesture: {screen: VerifyByGesture},
        // PageReplay: {screen: PageReplay},
        LaunchPage: {screen: LaunchPage},
        PageChangeGesturePsw: {screen: PageChangeGesturePsw},
        PageGesture: {screen: PageGesture},
        PageSetGesturePsw: {screen: PageSetGesturePsw},
        LoginByGesture: {screen: LoginByGesture},
        BankCardManage: {screen: BankCardManage},
        BankManageTabs: {screen: BankManageTabs},
        BankManageTabAll: {screen: BankManageTabs, path: 'BankManageTabAll'},
        BankManageTabOne: {screen: BankManageTabs, path: 'BankManageTabOne'},
        BankManageTabTwo: {screen: BankManageTabs, path: 'BankManageTabTwo'},


        PageChangePhone: {screen: PageChangePhone},
        PageChangePhoneNext: {screen: PageChangePhoneNext},

        PageSetting: {screen: PageSetting},
        PageChangePsw: {screen: PageChangePsw},
        DefaultCardManage: {screen: DefaultCardManage},
        CardDefault: {screen: CardDefault},
        TransactionRecord: {screen: TransactionRecord},
        DetailRecord: {screen: DetailRecord},


        addPayCard: {screen: addPayCard},
        InvestBuy: {screen: InvestBuy},
        Tab: {screen: TabNavigation},
        RealmTest: {screen: RealmTest},
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
