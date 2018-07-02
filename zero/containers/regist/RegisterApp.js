import React, {Component} from 'react';
import {
    Text,
    View,
    Dimensions,
    StatusBar, PixelRatio, Keyboard,SafeAreaView,
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
import {isIphoneX, zAppBarHeight, zdp, zsp, zStatusBarHeight} from "../../utils/ScreenUtil";
import ZText from "../../views/ZText";

import *as wechat from 'react-native-wechat'
import {updateApp} from "../global/AllModuleUtils";
import {updateAppByLogin} from "../../utils/updateAppUtil";
import NavigationUtil from "../../utils/NavigationUtil";
import {cusColors} from "../../value/cusColor/cusColors";


class RegisterApp extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            phone: '',
            phone: '13262975235',
            // phone: '13262972222',
            // phone: '13262970000',
            // phone: '13262975265',
            // phone: '15361505102',
            // phone: '13255556666',
            // password: '123456',
            password: '',
            password: 'qqqqqq',
            apkCodeName: '1.0'
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
        Platform.OS === 'android' ?
            updateApp.getApkName()
                .then(res => {
                    this.setState({
                        apkCodeName: res
                    })
                }).catch(err => {
                console.log(err);

            }) : null;

    }

    componentDidMount() {
        this.pressLogin();
        // alert(zStatusBarHeight);
    }


    /**
     *
     * @returns {*}
     */
    render() {

        return <SafeAreaView style={{flex: 1, justifyContent: 'flex-start', backgroundColor:'white',alignItems: 'center'}}>

             <View style={{flex: 1,marginTop:Platform.OS==='ios'?-zStatusBarHeight:0,justifyContent:'flex-start',alignItems:'center'}}>


            <Image source={{uri: isIphoneX()?'login_bg_x':'login_bg'}}
                   resizeMode={'cover'}
                   style={{
                       width,
                       height: height,
                       position: 'absolute'
                   }}/>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>

            </View>

            <View
                style={{flex: 1, alignItems: 'center'}}>

                <StatusBar
                    hidden={false}
                    translucent={true}
                    barStyle={'light-content'}//'default', 'light-content', 'dark-content'
                    backgroundColor={'#fff6fd00'}
                    networkActivityIndicatorVisible={false}
                />

                <Image source={require('../../../resource/image/appname.png')}
                       style={{width: zdp(140), height: zdp(66), marginTop: zAppBarHeight + zdp(20)}}
                       resizeMode={'contain'}/>


                <MyTextInputWithIcon
                    style={{marginTop: zdp(160)}}
                    maxLength={11}
                    placeholder={'请输入手机号'}
                    keyboardType={'numeric'}
                    iconName={'login_phone'}
                    onChangeText={text => {
                        this.setState({
                            phone: text
                        })
                    }}
                />

                <MyTextInputWithIcon
                    secureTextEntry={true}
                    placeholder={'密码登录'}
                    // keyboardType={'email-address'}
                    iconName={'login_psw'}
                    onChangeText={text => {
                        this.setState({
                            password: text
                        })
                    }}
                />


                <MyButtonView style={{width: width / 1.3, marginTop: zdp(40)}} modal={1}
                              title={'登 录'}
                              onPress={this.pressLogin}/>


                <View style={{
                    width,
                    marginTop: zdp(10),
                    height: zdp(40),
                    backgroundColor: 'transparent',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>


                    <TouchableOpacity activeOpacity={0.9}
                                      style={{
                                          justifyContent: 'center', alignItems: 'center',
                                          padding: zdp(5)
                                      }}
                                      onPress={
                                          this.pressLoginByVerify
                                      }>

                        <ZText parentStyle={{marginLeft: zdp(40)}} content={'验证码登录'}
                               fontSize={zsp(16)} color={cusColors.text_secondary}
                               textAlign={'center'}/>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.9}
                                      style={{
                                          justifyContent: 'center', alignItems: 'center',
                                          padding: zdp(5)
                                      }}
                                      onPress={
                                          this.pressForgetPsw
                                      }>

                        <ZText parentStyle={{marginRight: zdp(40)}} content={'忘记密码?'}
                               fontSize={zsp(16)} color={cusColors.text_secondary}
                               textAlign={'center'}/>
                    </TouchableOpacity>


                </View>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    padding: zdp(5),
                    marginTop: zdp(40)
                }}>
                    <ZText content={'没有账号?'} fontSize={zsp(16)} color={cusColors.text_secondary}/>
                    <MyButtonView style={{width: zdp(80), height: zdp(30), marginTop: 0}} modal={1}
                                  title={'注册账号'}
                                  fontSize={zsp(16)}
                                  onPress={this.pressRegister}/>


                </View>


            </View>

            {Platform.OS === 'android' ? <View style={{
                backgroundColor: cusColors.tab_light,
                padding: zdp(5),
                paddingLeft: zdp(10),
                paddingRight: zdp(10),
                borderRadius: zdp(10),
                position: 'absolute',
                bottom: zdp(20),
                right: zdp(30)
            }}>
                <ZText content={`当前版本:V${this.state.apkCodeName}`} fontSize={zsp(15)}
                       color={'white'}/>
            </View> : null}
             </View>
        </SafeAreaView>
            ;

    }

    /**
     * 点击登录
     */
    pressLogin = () => {

        Keyboard.dismiss();

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
                            NavigationUtil.reset(this.props.navigation, 'Tab');
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
    save2Global = resData => {
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

const mapStateToProps = state => {
    return {
        nav: state.nav
    }

};
const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        initGlobalInfo: actions.getGlobalInfo,
        initRegisterNav: actions_register.putNavigation,
    }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(RegisterApp);

