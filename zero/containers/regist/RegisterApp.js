import React, {Component} from 'react';
import {
    Text,
    View,
    Dimensions,
    StatusBar, PixelRatio,
    Alert, Image, TouchableOpacity, Animated, Platform
} from 'react-native';

const {width, height} = Dimensions.get('window');
import BaseComponent from '../global/BaseComponent';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import MyButtonView from "../../views/MyButtonView";

import MyLinearGradient from "../../views/MyLinearGradient";
import MyTextInputWithIcon from "../../views/MyTextInputWithIcon";
import {fetchRequest} from "../../utils/FetchUtil";
import {actions} from "../../root/GlobalAction";
import ToastUtil from "../../utils/ToastUtil";
import realm from "../../storage/realm";
import PageSetting from "../4Tab/set/PageSetting";
import BankManageTabAll from "../4Tab/BankManage/tabItem/BankManageTabAll";
import {checkMobile} from "../../utils/CheckUitls";
import {
    addSingleBankCard,
    getAllCard,
    getCardLength, getCreditCardDefault, getDebitCardDefault,
    getDebitCardList,
    getCreditCardList, deleteAllCard
} from "../../storage/schema_card";
import {save2Realm} from "./SaveRealmUtil";
import {getGestureData, isGestureLogin} from "../../storage/schema_gesture";
import {actions_register} from "./reduces/register";
import {zdp, zsp} from "../../utils/ScreenUtil";
import ZText from "../../views/ZText";

import *as wechat from 'react-native-wechat'
import {updateApp} from "../global/AllModuleUtils";
import {G, Path, Svg} from "react-native-svg";
import {updateAppByLogin} from "../../utils/updateAppUtil";
import NavigationUtil from "../../utils/NavigationUtil";


let AnimatedPath = Animated.createAnimatedComponent(Path);


class RegisterApp extends BaseComponent {


    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            // phone: '13262972222',
            // phone: '13262975235',
            // phone: '13262970000',
            // phone: '13262975265',
            // phone: '15361505102',
            // phone: '13255556666',
            // password: '123456',m
            // password: 'qqqqqq',
            password: '',
            // process: 0,
            // lineFillAnimation: new Animated.Value(0),
        }
        // this.lineAnimation = this.state.lineFillAnimation.interpolate({
        //     inputRange: [
        //         0,
        //         100
        //     ],
        //     outputRange: [
        //         `M5 8 l0 0`,
        //         `M5 8 l215 0`,
        //     ]
        // });

        // deleteAllCard();

        // addSingleBankCard('12345', '622848003121', '中国农业银行', '13262975235', 'ABC', 'DC', true);


        /*
                realm.write(()=>{
                    let anies = realm.objects('Card');
                    realm.delete(anies);
                })*/

        // alert(Dimensions.get('window').width * PixelRatio.get());


        // let payCardList = getCreditCardList('13262975235');
        // for (let i in payCardList) {
        //
        //     console.log(payCardList[i]);
        // }

    }

    componentWillMount() {
        // wechat.registerApp('wx8385a09b99f48b45')
        wechat.registerApp('wx6da45a3d441b507c');
        /* wechat.addListener(
             'SendMessageToWX.Resp',
             (response) => {
                 if (parseInt(response.errCode) === 0) {
                     ToastUtil.showShort('分享成功');
                 } else {
                     ToastUtil.showShort('分享失败');
                 }
             }
         );*/

    }

    componentDidMount() {
        // this.pressLogin();

    }


    /**
     *
     * @returns {*}
     */
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
                <Image source={require('../../../resource/image/loginbg.png')}
                       style={{width, height, position: 'absolute'}}/>

                <View
                    style={{flex: 1, alignItems: 'center'}}>

                    <Image source={require('../../../resource/image/appname.png')}
                           style={{width: zdp(140), height: zdp(66), marginTop: zdp(100)}}
                           resizeMode={'contain'}/>

                    <StatusBar
                        hidden={false}
                        translucent={true}
                        barStyle={'light-content'}//'default', 'light-content', 'dark-content'
                        backgroundColor={'#fff6fd00'}
                        networkActivityIndicatorVisible={false}
                    />

                    <MyTextInputWithIcon
                        style={{marginTop: zdp(40)}}
                        maxLength={11}
                        placeholder={'请输入手机号'}
                        keyboardType={'numeric'}
                        iconName={'phone'}
                        onChangeText={(text) => {
                            this.setState({
                                phone: text
                            })
                        }}
                    />
                    <MyTextInputWithIcon
                        secureTextEntry={true}
                        placeholder={'密码登录'}
                        // keyboardType={'email-address'}
                        iconName={'lock'}
                        onChangeText={(text) => {
                            this.setState({
                                password: text
                            })
                        }}
                    />

                    <View style={{
                        width,
                        height: zdp(40),
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text
                            style={{
                                fontSize: zsp(16),
                                color: 'white',
                                padding: zdp(10),
                                textAlign: 'center',
                                marginLeft: zdp(40),
                                alignSelf: 'flex-end'
                            }}
                            onPress={this.pressLoginByVerify}>{`验证码登录`}</Text>


                        <Text
                            style={{
                                fontSize: zsp(16),
                                color: 'white',
                                padding: zdp(10),
                                textAlign: 'center',
                                marginRight: zdp(40),
                                alignSelf: 'flex-end'
                            }}
                            onPress={this.pressForgetPsw}>{`忘记密码?`}</Text>

                    </View>


                    <MyButtonView style={{width: width / 1.3, marginTop: zdp(5)}} modal={1}
                                  title={'登 录'}
                                  onPress={this.pressLogin}/>


                    <Text
                        style={{
                            fontSize: zsp(16),
                            color: 'lightgrey',
                            padding: zdp(10),
                            paddingRight: zdp(40),
                            textAlign: 'center',
                            alignSelf: 'center'
                        }}
                    >{`没有账号? `}<Text style={{color: 'white'}}
                                     onPress={this.pressRegister}>点击注册</Text></Text>

                </View>
            </View>
        )
            ;

    }

    /**
     * 点击登录
     */
    pressLogin = () => {

        if (!checkMobile(this.state.phone)) {
            return;
        }


        let formData = new FormData();
        formData.append('phone', this.state.phone);
        formData.append('password', this.state.password);
        fetchRequest('Login', 'POST', formData)
            .then(res => {
                    console.log(res);
                    console.log(res.data);

                    if (res.respCode === 200) {
                        let allCard = getAllCard(res.data.merCode);
                        console.log(...allCard);
                        let cardLength = getCardLength(res.data.merCode);
                        console.log(cardLength);
                        console.log(res.data.CardLen);
                        if (cardLength !== res.data.CardLen) {
                            //长度不同则刷新本地数据库
                            save2Realm(res.data);
                        }
                        this.save2Global(res.data)

                        console.log(this.props.globalInfo);
                        /*
                                                if (this.params.type === 0) {
                                                    this.props.navigation.navigate('PageSetGesturePsw', {
                                                        type: 0,
                                                        onGoBack: () => {

                                                        }
                                                    });
                                                } else {

                                                    this.props.navigation.navigate('Tab');
                                                }*/
                        // this.props.navigation.navigate('BankCardManage');
                        // this.props.navigation.navigate('PageSetting');

                        //登录检查版本升级


                        // this.props.navigation.navigate('addPayCard',{cardType: 'DC',onGoBack:()=>{
                        //     alert('back')
                        //     }});

                        if (isGestureLogin()) {
                            // this.props.navigation.navigate('Tab');
                            NavigationUtil.reset(this.props.navigation,'Tab');
                        } else {
                            this.props.navigation.navigate('PageSetGesturePsw', {type: 0});
                        }
                        // this.props.navigation.navigate('BankManageTabAll');
                        // this.props.navigation.navigate('BankCardManage');
                        // this.props.navigation.navigate('PageSetting');
                        // this.props.navigation.navigate('PageChangePhoneNext');
                        // this.props.navigation.navigate('MerchantInfo');
                        // this.props.navigation.navigate('CardDefault');

                    } else {
                        ToastUtil.showShort(res.respMsg);
                    }
                }
            ).catch(err => {
            console.log(err);
            ToastUtil.showShort(err)
        });
    };

    /**
     * 存储全局信息
     * @param resData
     */
    save2Global = (resData) => {
        this.props.initGlobalInfo({
            token: resData.token,
            phone: resData.phone,
            IDCard: resData.identity,
            username: resData.name,
            merCode: resData.merCode,
            appUser: resData.appUser,
            recommend: resData.recommend
        });
    }

    /**
     * 验证码登录
     */
    pressLoginByVerify = () => {
        this.props.navigation.navigate('LoginByVerify');
    }


    /**
     * 忘记密码
     */
    pressForgetPsw = () => {
        this.props.initRegisterNav(this.props.navigation);
        this.props.navigation.navigate('ForgetPsw');
    };
    /**
     * 点击注册
     */
    pressRegister = () => {
        this.props.initRegisterNav(this.props.navigation);
        this.props.navigation.navigate('RegisterMerchant');
    }

}

const mapStateToProps = (state) => {
    return {
        nav: state.nav
    }

};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        initGlobalInfo: actions.getGlobalInfo,
        initRegisterNav: actions_register.putNavigation,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterApp);

